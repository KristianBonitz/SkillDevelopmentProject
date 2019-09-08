//TODO: How to use outside API for activity list

function StartClock(){
  clock = window.setInterval(checkTime, 1000);
  drillsActive = true;
  updateTimer();
}

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

Vue.component('activity-timer-display',{
    props:['time', 'activity'],
    template:   "<div id='activity-timer'><activity-title" + 
                "v-bind:activity='activity'\n" +
                "v-bind:key='activity.id'>\n"  +
                "</activity-title>\n" +
                "<activity-clock\n" + 
                "v-bind:time='time'>\n"+
                "</activity-clock></div>\n"
});

Vue.component('activity-item', {
    props: ['activity'],
    template: "<li>{{ activity.objects.count }} {{ activity.objects.name }} {{ activity.name }}</li>" 
    //TODO: add time length for {{ getTime(activity.learningStage) }}
});

Vue.component('skip-button', {
    template: "<button>Skip</button>"
});
Vue.component('restart-button', {
    template: "<button>Restart</button>"
});
Vue.component('pauseplay-button', {
    template: "<button>Pause/Play</button>"
});
var activityTimerControls = new Vue({
    el:'#activity-timer-controls',
    data:{
        clock: {},
        isActive: false
    },
    methods: {
        startTime: function(){
            this.clock = window.setInterval(this.updateTime, 1000);
            this.isActive = true;
        },
        stopTime: function(){
            clearInterval(this.clock);
            this.isActive = false;
        },
        updateTime: function(){
            if(this.time.hour <= 0 && this.time.minute <= 0 && this.time.second <= 0){
                clearInterval(this.clock);
                //TODO: add start next activity if others exist or stop everything
            }
            if(this.time.second > 0){
                this.time.second--;
            }else if(this.time.minute > 0){
                this.time.minute--;
                this.time.second = 59;
            }else if(this.time.hour > 0){
                this.time.hour--;
                this.time.minute = 59;
                this.time.second = 59;
            }
        }
    }
})

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