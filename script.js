const app = {

  apiUrl: 'https://sheetdb.io/api/v1/u79mxwmsfdsnj',

  personTemplate: '<div class="entry">{{firstName}} {{lastName}} {{major}}</div>',

  initialize: () => {
    app.getTheData();
    app.attachListeners();
  },

  attachListeners: () => {
    $('.submit').click(e => {
      app.addSomeone();
    })
  },

  addSomeone: () => {
    const data = {
      firstName: $('.firstName').val(),
      lastName: $('.lastName').val(),
      major: $('.major').val(),
    };

    const requestBody = {data: [data]};

    fetch(app.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(response => {
      app.getTheData();
    })
  },

  getTheData: () => {
    fetch(app.apiUrl)
    .then(response => response.json())
    .then (response => {
      response.forEach(entry => {
          // render the template with the data
          const data = {
            firstName: entry.firstName,
            lastName: entry.lastName,
            major: entry.major
          }
          const rendered = Mustache.render(app.personTemplate, entry);
          // add the element to the container
          $('.container').append(rendered);
      })
    });
  },
}