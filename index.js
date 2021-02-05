/**
 * send an invitation of owership to a teacher once a day.
 * It needs to be put in a trigger.
 * There is an exception list and an outputsheet
 * @returns{void}
 */
function run() {
  try {
    const currentUser = Session.getActiveUser().getEmail();
    const allTeachers = getTeachersFromAllClassrooms();
    allTeachers.forEach(teacherCluster => {

      for (nextTeacher of teacherCluster) {
        const { courseId, profile: { emailAddress } } = nextTeacher;
        /* not currentUser and is the creator of the classroom and not in exceptionEmailList  */
        if (emailAddress !== currentUser
          && getClassroomOwnerEmail(courseId) === currentUser
          && !exceptionEmailList().includes(emailAddress
          )) {
          const invitation = sendOwershipInvitation(nextTeacher);
          (invitation) ? saveRecordInSheet(invitation, nextTeacher) : invitation;
          // (invitation) ? notifyByEmail(nextTeacher) : null;

        } else {
          console.log('There are not more actions to execute')
        }
      }
    });
  } catch (e) {
    console.log('error from catch', e)
  }
}

/**
 * finds the email address of the owner of the classroom
 * @param{ courseId }
 * @returns{ string } emailAddress 
 */
function getClassroomOwnerEmail(courseId) {
  const { ownerId } = Classroom.Courses.get(courseId);
  const { emailAddress } = Classroom.UserProfiles.get(ownerId);
  return emailAddress
}


function getAllClassrooms() {
  return Classroom.Courses.list().courses;
}
/**
 * iterates all classrooms and returns an array of teacher
 * @returns{ array }
 */
function getTeachersFromAllClassrooms() {
  const classrooms = getAllClassrooms();
  const arrayOfTeachers = [];
  for (classroom of classrooms) {
    const { name, id } = classroom;
    const teachersInClassroom = Classroom.Courses.Teachers.list(id).teachers;

    arrayOfTeachers.push(teachersInClassroom)
  }
  return arrayOfTeachers;
}
sed

/**
 * if an invitation was not sent today,
 * it calls removeInvitation()
 * @function {sendOwershipInvitation}
 * 
 */
function sendOwershipInvitation(teacher) {
  const { create, list, remove } = Classroom.Invitations;
  const { courseId, userId, emailAddress } = teacher;
  let newInvitation

  console.log(teacher.profile.name.fullName)

  if (invitationNotSentToday(courseId)) {

    // remove Inviations
    const removedRecord = removeInvitation(courseId);

    /* send new invitation if the inviation was not sent today 
    and the email of the current teacher was not used yesterday else assign false to newInvitation
     doublechecked !invitationNotSentToday(courseId) because the condition needs to be fresh */
    newInvitation = (!invitationNotSentToday(courseId) && !removedRecord[3].toString().includes(emailAddress))
      ? create({ userId, courseId, role: 'OWNER' })
      : false;
    return newInvitation;
  } else if (courseIdIsUsed(courseId)) {  // if the course courseId is today already
    console.log('already in use')
    return false;
  } else if (!courseIdIsUsed(courseId)) {
    // if the courseId is used for the first time
    newInvitation = (!invitationNotSentToday(courseId)) ? create({ userId, courseId, role: 'OWNER' }) : false;
    return newInvitation || false;
  }

}


function courseIdIsUsed(courseId) {
  const data = getOutputSheet().getDataRange().getValues();
  const result = data.find((record) => record[0].toString() === courseId);
  return result !== undefined;
}

/**
 * checks if there is a there is a record with courseId that is not AlreadyTriedSending
 * and is not createdDay, in the outputSheet moves that courseid to the from column 1 to column 9
 * and sets column 8 to AlreadyTriedSending to be used by the logic of future iterations,
 * removes the invitation using Classroom.Invitations.remove using the value saved in column 7
 * from the previous iteration.
 * @param{ courseId }
 * @returns { tableRecord } 
 */
function removeInvitation(courseId) {
  const { remove } = Classroom.Invitations;
  const data = getOutputSheet().getDataRange().getValues();

  const consutedRecord = data.find((record) => conditionForFindingRecord(record, courseId));

  if (consutedRecord) {
    const invitationId = consutedRecord[7];
    const indexOfToken = data.indexOf(consutedRecord);
    if (indexOfToken >= 0) {
      getOutputSheet().getRange(indexOfToken + 1, 8).setValue('AlreadyTriedSending');
      getOutputSheet().getRange(indexOfToken + 1, 9).setValue(consutedRecord[0]);
      getOutputSheet().getRange(indexOfToken + 1, 1).setValue('');
    }
    remove(invitationId);
  }
  return consutedRecord;
}


function invitationNotSentToday(courseId) {
  const sheet = getOutputSheet();
  const data = sheet.getDataRange().getValues()
  const result = data.find((record) => conditionForFindingRecord(record, courseId));
  return result !== undefined;
}

function conditionForFindingRecord(record, courseId) {
  const createdDay = isToday(new Date(record[5]));
  return record[0].toString() === courseId && record[7] !== 'AlreadyTriedSending' && !createdDay

}

function saveRecordInSheet(invitation, teacher) {
  const { courseId, profile: { name: { fullName }, emailAddress }, userId } = teacher;
  const courseName = Classroom.Courses.get(courseId).name
  const sheet = getOutputSheet();
  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, 8).setValues([[courseId, courseName, fullName, emailAddress, userId, new Date(), Session.getEffectiveUser().getEmail(), invitation.id]]);
}

/**
 * 
 * @param{ center: { emailAddresses: [ ], centerName, coordinator, classrooms:[ { section, enrollmentCode, name } ]} }
 */
function notifyByEmail(teacher) {
  const { profile: { emailAddress } } = teacher;

  MailApp.sendEmail({
    to: emailAddress,
    bcc: 'eipvirtual2021@gmail.com',
    replyTo: `wmilanes@mescyt.gob.do,eipvirtual2021@gmail.com, ${Session.getEffectiveUser().getEmail()}`,
    subject: "INSTRUCCIONES SOBRE TRANSFERENCIA DE POSESIÓN DE AULA, INGLÉS DE INMERSIÓN | MESCYT",
    htmlBody: getHTMLEmail(teacher),

  });
}

