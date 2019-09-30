//TODO: How to use outside API for activity list

var app = new Vue({
    el: '#app',
    data: {
        time: {hour: 0, minute: 0, second: 0},
        clock: 0,
        isRunning: false,
        inProgress: false,
        activeActivity: 0,
        activityList: [],
        activity: 0
    },
    created: function(){
        //this.restartClock();    
    },
    mounted () {
        axios
          .get('http://localhost:5432/getData') //todo: add in user id
          .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                var aFormat = {
                    id: i,
                    name: response.data[i].name,
                    objects: { count: response.data[i].object_count, name: response.data[i].object_name }, //none
                    learningStage: response.data[i].learning_stage, // 3: maintaing
                    //siteswap
                    tags: [],
                    custom:{}
                }
                this.activityList.push(aFormat)
                this.restartClock();  
            }
        })
    },
    methods: {
        startTime: function(){
            console.log('start');
            if(this.clock == false){
                this.clock = window.setInterval(this.updateTime, 50);
            }
            this.inProgress = true;
        },
        stopTime: function(){
            console.log('stop');
            clearInterval(this.clock);
            this.clock = 0;
            this.inProgress = false;
        },
        updateTime: function(){
            if(this.time.hour <= 0 && this.time.minute <= 0 && this.time.second <= 0){
                if (this.activityList.length - 1 > this.activeActivity) {
                    this.activeActivity++;
                    this.restartClock()
                }else{
                    window.alert("Timer Complete");
                    this.stopTime();
                    this.resetActivities();
                }
            }else if(this.time.second > 0){
                this.time.second--;
            }else if(this.time.minute > 0){
                this.time.minute--;
                this.time.second = 59;
            }else if(this.time.hour > 0){
                this.time.hour--;
                this.time.minute = 59;
                this.time.second = 59;
            }
        },
        restartClock: function(){
            console.log('action: restart clock');
            console.log('activity:', this.activityList[this.activeActivity]);

            var activity = this.activityList[this.activeActivity];
            var tempTime = learningTimes(activity.learningStage);
            if(tempTime){
                console.log("time set by learning stage");
                this.time = tempTime;
            }else{
                console.log("time set by custom")
                if(activity.custom.time){
                    var tObj = activity.custom.time;
                    this.time = { hour: tObj.hour, minute: tObj.minute, second: tObj.second }
                }else{
                    console.error("time not settable")
                }
            }
        },
        resetActivities: function(){
            this.activeActivity = 0;
            this.restartClock();
        },
        skipActivity: function(){
            console.log('skip'); 
            this.time = { hour: 0, minute: 0, second: 0 };
            this.updateTime();
        }
    }
});

function learningTimes(stage){
    if(stage == 3){ //maintaining
        return { hour: 0, minute: 0, second: 30 };
    }else if(stage == 2){ //improving
        return { hour: 0, minute: 1, second: 15 };
    }else if(stage == 1){ //learning
        return { hour: 0, minute: 2, second: 30 };
    }else if(stage == 0){ //custom
        return false;
    }
}

