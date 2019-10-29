//import learningTimes from "script.js";

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

Vue.component('trick-list',{
    props:['trickList'],
    template: "<ul><trick-item \n" +
        "v-for='trick in trickList' \n" +
        "v-bind:trick='trick'\n" +
        "v-bind:key='trick.id'></trick-item>\n" +
        "</ul>"
});

Vue.component('trick-item', {
    props: ['trick'],
    template: "<li>{{ trick.objects.count }} {{ trick.objects.name }} {{ trick.name }} - {{ trick.learningStage }}</li>" 
});

Vue.component('add-trick', {
    template: "<form action='/addTrick' method='post'>\n"+
"    Name (required): <input type='text' name='name'><br>\n"+
"    Object/s Used: <input type='text' name='objectName'><br>\n"+
"    Object Count: <input type='number' name='objectCount'><br>\n"+
"    Difficulty ( 0 - 10 ): <input type='number' name='difficulty'><br>\n"+
"    siteswap: <input type='text' name='siteswap'><br>\n"+
"    <input type='submit' value='Submit'>\n"+
"</form>\n"
});

function formatTime(tObj){
    return tObj.hour ? tObj.hour.toString().padStart(2, '0') + ':' : '' + tObj.minute.toString().padStart(2, '0')  + ':' + tObj.second.toString().padStart(2, '0')
}