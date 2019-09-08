//var listOfActivities = ;

Vue.component('activity-title', {
    props: ['activity'],
    template: "<div><h2>{{ activity.name }}</h2>\n" +
              "<span>Using: {{ activity.objects.count }} {{ activity.objects.name }}</span>\n" +
              "<div><span>Tags: </span>\n" +
              "<ul>\n" +
              "<li v-for='tag in activity.tags'>{{ tag }}</li>\n" +
              "</ul></div></div>\n"
});

Vue.component('activity-clock', {
    props: ['time'],
    template: "<h2>{{ time.hour ? time.hour.toString().padStart(2, '0') + ':' : '' }}{{ time.minute.toString().padStart(2, '0') }}:{{ time.second.toString().padStart(2, '0') }}</h2>"
});

var activityTimer = new Vue({
    el: '#activity-timer',
    data: {
        time: { hour: 0, minute: 2, second: 0 },
        activity: {
            id: 5,
            name: 'Reverse Fountain',
            objects: {count: 4, name: 'Balls'},
            learningStage: 1, // 1: improving
            tags: ['numbers', 'warm-up']
        }
    }
});

Vue.component('activity-title', {
    props: ['todo'],
    template: "<li>{{ todo.text }}</li>"
});

Vue.component('activity-item', {
    props: ['activity'],
    template: "<li>{{ activity.objects.count }} {{ activity.objects.name }} {{ activity.name }}</li>" //TODO: add time length for {{ getTime(activity.learningStage) }}
});

var activityList = new Vue({
    el: '#activity-list',
    data: {
        activityList: [
            { //activity
                id: 0,
                name: 'Fountain',
                objects: { count: 4, name: 'Ball' },
                learningStage: 2,
                tags: ['numbers', 'warm-up'],
                custom: {}
            },{ //activity
                id: 1,
                name: 'Push-ups',
                objects: {}, //none
                learningStage: 0, // 1: use custom
                tags: ['physical', 'warm-up'],
                custom:{
                    time: { hour: 0, minute: 0, second: 30 }
                }
            },{ //activity
                id: 2,
                name: 'Mills Mess',
                objects: { count: 4, name: 'Club' }, //none
                learningStage: 1, // 1: learning
                tags: ['Mills-Mess', 'life-goals'],
                custom:{}
            },{ //activity
                id: 3,
                name: 'Cascade',
                objects: { count: 3, name: 'Ball' }, //none
                learningStage: 3, // 3: maintaing
                tags: ['easy', 'life-goals'],
                custom:{}
            }
        ]
    },
    methods: {
    }
});

function getTime(value){
    switch(value){
        case 0:
            return "00:30";
        case 1:
            return "05:30";
        case 2:
            return "02:15";
        case 3:
            return "00:45";
        default:
            return "00:15";
    }
}

var app5 = new Vue({
    // el: '#app-5',
    data: {
        message: "Kayak on kayak Mountain."
    },
    methods: {
        reversemessage: function(){
            this.message = this.message.split('').reverse().join('');
        }
    }
});