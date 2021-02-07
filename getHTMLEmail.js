function getHTMLEmail(teacher) {
    const { courseId, profile: { name: { fullName } } } = teacher;
  const courseName = Classroom.Courses.get(courseId).name
  return `<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <style type="text/css">
      ol { 
        margin: 0;
        padding: 0;
      }
      table td,
      table th {
        padding: 0;
      }
      .c2 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
        height: 11pt;
      }
      .c1 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c0 {
        padding-top: 12pt;
        padding-bottom: 12pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c3 {
        background-color: #ffffff;
        max-width: 567.1pt;
        padding: 14.2pt 14.2pt 14.2pt 14.2pt;
      }
      .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
    </style>
  </head>
  <body class="c3">
    <p class="c0"><span class="c1">Buenas, ${fullName }.</span></p>
    <p class="c0">
      <span class="c1"
        >Te hemos enviado una
        invitaci&oacute;n para que aceptes la posesi&oacute;n del aula ${ courseName } en
        la cual eres co-profesor.</span
      >
    </p>
    <p class="c0">
      <span class="c1"
        >La invitaci&oacute;n fue enviada previamente a este correo, verifica
        que la recibiste; es posible que este en tu bandeja de spam o junk
        mail. Es necesario que aceptes la invitación para que tengas acceso a todas las funciones del aula.</span
      >
    </p>
   
    <p class="c0">
      <span class="c1"
        >Una vez aceptes la posesi&oacute;n, env&iacute;anos un correo
        electr&oacute;nico a: athomas@mescyt.gob.do y wmilanes@mescyt.gob.do
        &nbsp;. Por favor indica que terminaste este proceso. Incluye tu nombre,
        el nombre del aula y del centro.</span
      >
    </p>
  
    <p class="c0"><span class="c1">Atentamente,</span></p>
    <p class="c0">
      <span class="c1">Equipo dando asistencia con Google Classroom.</span>
    </p>
    <p class="c2"><span class="c1"></span></p>
  </body>
</html>
`
}
