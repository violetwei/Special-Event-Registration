import _ from 'lodash';
import axios from 'axios';
let config = require('../../config');

let backendConfigurer = function () {
  switch (process.env.NODE_ENV) {
    case 'testing':
    case 'development':
      return 'http://' + config.dev.backendHost + ':' + config.dev.backendPort;
    case 'production':
      return 'https://' + config.build.backendHost + ':' + config.build.backendPort;
  }
}

let backendUrl = backendConfigurer();

let AXIOS = axios.create({
  baseURL: backendUrl
  // headers: {'Access-Control-Allow-Origin': frontendUrl}
});

export default {
  name: 'eventregistration',
  data () {
    return {
      persons: [],
      events: [],
      // newPerson: '',
      personType: 'Person',
      newEvent: {
        name: '',
        date: '2017-12-08',
        startTime: '09:00',
        endTime: '11:00',
        title: ''
      },
      newPerson: {
        name: '',
        event: ''
      },
      selectedPerson: '',
      selectedEvent: '',
      selectedPromoter: '',
      deviceId: '',
      bitcoinAmount: '',
      errorPerson: '',
      errorEvent: '',
      errorTheatre: '',
      errorRegistration: '',
      errorAssignment: '',
      response: [],
      promoters: [],
      slectedDeviceId: '',
      selectedBitcoinAmount: ''
    }
  },
  created: function () {
    // Initializing persons
    AXIOS.get('/persons')
    .then(response => {
      this.persons = response.data;
      this.persons.forEach(person => this.getRegistrations(person.name))
    })
    .catch(e => { this.errorPerson = e });

    AXIOS.get('/events').then(response => { this.events = response.data }).catch(e => { this.errorEvent = e });

    AXIOS.get(`/theatre`).then(response => { console.log(response.data); this.events = response.data })
    .catch(e => { this.errorTheatre = e });
  },

  methods: {

    createPerson: function (personType, personName) {
      AXIOS.post('/persons/'.concat(personName), {}, {})
      .then(response => {
        this.persons.push(response.data);
        this.errorPerson = '';
        this.newPerson = '';
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        this.errorPerson = e;
        console.log(e);
      });
    },

    createEvent: function (newEvent) {
      let url = '';
      console.log(newEvent)

      if (newEvent.title === '--') {
        AXIOS.post('/events/'.concat(newEvent.name), {}, {params: newEvent})
      .then(response => {
        this.events.push(response.data);
        this.errorEvent = '';
        this.newEvent.name = this.newEvent.make = this.newEvent.movie = this.newEvent.company = this.newEvent.artist = this.newEvent.title = '';
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        this.errorEvent = e;
        console.log(e);
      });
      } else {
        // /theatre/aswe?name=aswe&date=2017-12-08&startTime=09:00&endTime=11:00&title=qqq
        AXIOS.post('/theatre/'.concat(newEvent.name), {}, {params: newEvent}, {} + newEvent.title)
      .then(response => {
        this.events.push(response.data);
        this.errorEvent = ''
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        this.errorEvent = e;
        console.log(e);
      });
      }  
    },

    registerEvent: function (personName, eventName) {
      let event = this.events.find(x => x.name === eventName);
      let person = this.persons.find(x => x.name === personName);
      let params = {
        person: person.name,
        event: event.name
      };

      AXIOS.post('/register', {}, {params: params})
      .then(response => {
        person.eventsAttended.push(event)
        this.selectedPerson = '';
        this.selectedEvent = '';
        this.errorRegistration = '';
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        this.errorRegistration = e;
        console.log(e);
      });
    },

    getRegistrations: function (personName) {
      AXIOS.get('/events/person/'.concat(personName))
      .then(response => {
        if (!response.data || response.data.length <= 0) return;

        let indexPart = this.persons.map(x => x.name).indexOf(personName);
        this.persons[indexPart].eventsAttended = [];
        response.data.forEach(event => {
          this.persons[indexPart].eventsAttended.push(event);
        });
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        console.log(e);
      });
    },

    assignPromoters: function (promoterName, eventName) {
      let event = this.events.find(x => x.name === eventName);
      let promoter = this.promoters.find(x => x.name === promoterName);
      let params = {
        promoter: promoter.name,
        event: event.name
      };

      AXIOS.post('/assign', {}, {params: params})
      .then(response => {
        promoter.eventsAttended.push(event)
        this.selectedPromoter = '';
        this.selectedEvent = '';
        this.errorAssignment = '';
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        this.errorAssignment = e;
        console.log(e);
      });
    },

    makePayment: function (personName, eventName, deviceId, bitcoinAmount) {
      let event = this.events.find(x => x.name === eventName);
      let person = this.persons.find(x => x.name === personName);
      let params = {
        person: person.name,
        event: event.name,
        deviceId,
        bitcoinAmount
      };

      AXIOS.post('/pay', {}, {params: params})
      .then(response => {
        person.eventsAttended.push(event)
        this.selectedPerson = '';
        this.selectedEvent = '';
        this.deviceId = '';
        this.bitcoinAmount = '';
        this.errorAssignment = '';
      })
      .catch(e => {
        e = e.response.data.message ? e.response.data.message : e;
        this.errorAssignment = e;
        console.log(e);
      });
    }
  }
}
