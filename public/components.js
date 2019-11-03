//import learningTimes from "script.js";
//TIMER COMPONENTS
Vue.component('timer', {
    created: function(){
        this.restartClock();
    }
})

Vue.component('activity-clock', {
    props: ['time'],
    template: "<h2>{{ time.hour ? time.hour.toString().padStart(2, '0') + ':' : '' }}{{ time.minute.toString().padStart(2, '0') }}:{{ time.second.toString().padStart(2, '0') }}</h2>"
});

Vue.component('activity-title', {
    props: ['activity'],
    template: "<div><h2>{{ activity.name }}</h2>\n" +
              "<span>Using: {{ activity.objects.count }} {{ activity.objects.name }}</span>\n" +
              "<div><span>Tags: </span>\n" +
              "<ul>\n" +
              "<li v-for='tag in activity.tags'>{{ tag }}</li>\n" +
              "</ul></div></div>\n"
});

Vue.component('activity-timer-display',{
    props: {
        time: {
            type: Object,
            required: true
        },
        activity: {
            type: Object,
            required: true
        }
    },
    template: 
        "<div id='activity-timer'><activity-title\n" + 
        "v-bind:activity='activity'\n" +
        "v-bind:key='activity.id'>\n"  +
        "</activity-title>\n" +
        "<activity-clock\n" + 
        "v-bind:time='time'>\n"+
        "</activity-clock></div>"
});


Vue.component('activity-timer-controls',{
    props: ['inProgress','isRunning'],
    template: 
        "<div>Timer Controls\n" +
        "<button v-on:click=\"$emit('skip')\">Skip</button>\n" +
        "<button v-on:click=\"$emit('restart')\">Restart</button>\n" +
        "<button \n" +
        "v-if='!inProgress'\n" +
        "v-on:click=\'$emit(\"start\")\'>Start</button>\n" +
        "<button \n" +
        "v-if='inProgress'\n" +
        "v-on:click=\'$emit(\"stop\")\'>Stop</button>\n" +
        "</div>"
});

Vue.component('activity-list',{
    props:['activityList', 'activeActivity'],
    template: "<ol><activity-item \n" +
        "v-for='activity in activityList' \n" +
        "v-bind:activity='activity'\n" +
        "v-bind:is-active='activity.id == activeActivity'\n" +
        "v-bind:key='activity.id'></activity-item>\n" +
        "</ol>"
});

Vue.component('activity-item', {
    props: ['activity', 'isActive'],
    data: function(){
        return { time: formatTime(this.activity.time) }
    },
    template: "<li v-bind:class='{ active: isActive }'>{{ activity.objects.count }} {{ activity.objects.name }} {{ activity.name }} - {{ time }}</li>" 
    //TODO: add time length for {{ learningTimes(activity.learningStage) }}
});

// LIST COMPONENTS

function formatTime(tObj){
    return tObj.hour ? tObj.hour.toString().padStart(2, '0') + ':' : '' + tObj.minute.toString().padStart(2, '0')  + ':' + tObj.second.toString().padStart(2, '0')
}