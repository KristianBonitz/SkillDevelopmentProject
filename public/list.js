//TODO: Track total time for activities to be run through
//TODO: Return to database the amount of time, user has spent on activity X
//TODO: List total time done during activity.

var app = new Vue({
    el: '#app',
    data: {
        activityList: [],
        activity: {
            id: 0,
            name: "",
            description: "",
            objects: { count: 0, name: "" }, 
            learningStage: 0, 
            time: { hour: 0, minute: 0, second: 0 },
            tags: [],
            custom:{}
        }
    },
    created: function(){
        //this.restartClock();    
    },
    mounted: function(){
        axios
          .get('http://localhost:5432/getData') //todo: add in user id
          .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                var aFormat = {
                    id: i,
                    name: response.data[i].name,
                    description: "",
                    objects: { count: response.data[i].object_count, name: response.data[i].object_name }, //none
                    learningStage: response.data[i].learning_stage, // 3: maintaing
                    tags: [],
                    custom:{}
                }
                this.activityList.push(aFormat)
            }
        })
    },
    methods: {
    }
});

var app = new Vue({
    el: '#add',
    data: {
        activityList: [],
        activity: {
            id: 0,
            name: "",
            description: "",
            objects: { count: 0, name: "" }, 
            learningStage: 0, 
            time: { hour: 0, minute: 0, second: 0 },
            tags: [],
            custom:{}
        }
    },
    created: function(){
        //this.restartClock();    
    },
    mounted: function(){
        axios
          .get('http://localhost:5432/getData') //todo: add in user id
          .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                var aFormat = {
                    id: i,
                    name: response.data[i].name,
                    description: "",
                    objects: { count: response.data[i].object_count, name: response.data[i].object_name }, //none
                    learningStage: response.data[i].learning_stage, // 3: maintaing
                    tags: [],
                    custom:{}
                }
                this.activityList.push(aFormat)
            }
        })
    },
    methods: {
    }
});

