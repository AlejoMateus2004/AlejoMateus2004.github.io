//Cargar el archivo JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {

    // Obtener el contenedor .about y asignarle la descripcion del perfil
    const aboutme = document.querySelector('.about')
    aboutme.innerHTML= '<h3><i class="fa fa-user"></i>About me</h3>'+ '<p>' + data.persona.descripcion + '</p>';
     
    //obtener contenedor info y asignarle informacion dinamica
    //foto
    const photo = document.querySelector('.profile .photo')
    photo.innerHTML = `<img src="/files/${data.persona.foto}" />`;
    //info
    const info = document.querySelector('.profile .info')
    info.innerHTML = `
    <h4 class="name">${data.persona.nombre} ${data.persona.apellido}</h4>
    <small class="job">${data.persona.job}</small>`;

    //obtener contenedor contact y asignarle informacion dinamica
    //phone
    const phone = document.querySelector('.contact .phone')
    phone.innerHTML = '<i class="fa fa-phone"></i><span>'+ data.persona.telefono+'</span>';
    //email
    const mail = document.querySelector('.contact .email')
    mail.innerHTML = `
      <a href="mailto:${data.persona.mail}" style="display: flex;">
        <i class="fa fa-envelope"></i>
        <span style="word-break: break-all;">${data.persona.mail}</span>
      </a>`;

    // Obtener la lista de lenguage del archivo JSON
    const lenguages = data.idiomas;
    //obtener el contenedor lenguages-list y asiganarle informacion
    const lenguageslist = document.getElementById('lenguages-list');
    lenguageslist.innerHTML = '';
    lenguages.forEach(lenguage => {
      const li = document.createElement('li');
      li.innerHTML = `
      <span>${lenguage.idioma}</span><small>${lenguage.nivel}</small>
      `;
      lenguageslist.appendChild(li);
    });

    // Obtener la lista de educacion del archivo JSON
    const edulist = data.educacion;
    //obtener el contenedor education-list y asiganarle informacion
    const Educacionlist = document.getElementById('education-list');
    Educacionlist.innerHTML = '';
    edulist.forEach(educacion =>{
      const li = document.createElement('li');
      li.innerHTML = `
      <span>${educacion.lugar}</span><small>${educacion.descripcion} ${educacion.periodo}</small>
      `;
      Educacionlist.appendChild(li);
    });

    // Obtener la lista de prog-skills del objeto "skills" del archivo JSON
    const progSkills = data.skills['prog-skills'];
    
    // Generar los elementos HTML correspondientes y agregarlos a la lista
    const progSkillsList = document.getElementById('prog-skills-list');
    progSkillsList.innerHTML = '';
    progSkills.forEach(skill => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${skill.nombre}</span>
        <div class="skills-bar">
          <div class="bar" style="width:${skill.porcentaje}%"></div>
        </div>
      `;
      progSkillsList.appendChild(li);
    });
  })
  .catch(error => {
    console.error(error);
  });
  
(function () {
  $('.skills-prog li')
    .find('.skills-bar')
    .each(function (i) {
      $(this)
        .find('.bar')
        .delay(i * 150)
        .animate(
          1000,
          'linear',
          function () {
            return $(this).css({
              'transition-duration': '.5s',
            });
          },
        );
    });

  $('.skills-soft li')
    .find('svg')
    .each(function (i) {
      var c, cbar, circle, percent, r;
      circle = $(this).children('.cbar');
      r = circle.attr('r');
      c = Math.PI * (r * 2);
      percent = $(this).parent().data('percent');
      cbar = ((100 - percent) / 100) * c;
      circle.css({
        'stroke-dashoffset': c,
        'stroke-dasharray': c,
      });
      circle.delay(i * 150).animate(
        {
          strokeDashoffset: cbar,
        },
        1000,
        'linear',
        function () {
          return circle.css({
            'transition-duration': '.3s',
          });
        },
      );
      $(this)
        .siblings('small')
        .prop('Counter', 0)
        .delay(i * 150)
        .animate(
          {
            Counter: percent,
          },
          {
            duration: 1000,
            step: function (now) {
              return $(this).text(Math.ceil(now) + '%');
            },
          },
        );
    });
}.call(this));



