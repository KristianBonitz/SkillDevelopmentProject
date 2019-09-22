//TODO: How to use outside API for activity list

var app = new Vue({
    el: '#app',
    data: {
        time: {hour: 0, minute: 2, second: 0},
        clock: 0,
        isRunning: false,
        inProgress: false,
        activeActivity: 0,
        activityList: [
            { //activity
                id: 0,
                name: 'Fountain',
                objects: { count: 4, name: 'Ball' },
                //userdata
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
        ],
    },
    created: function(){
        this.restartClock();    
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
            console.log('restart');
            var activity = this.activityList[this.activeActivity];
            console.log(activity.learningStage);
            console.log(activity.custom.time);
            var tempTime = learningTimes(activity.learningStage);
            if(tempTime){
                console.log("set by stage");
                this.time = tempTime;
            }else{
                console.log("set by custom")
                if(activity.custom.time){
                    var tObj = activity.custom.time;
                    this.time = { hour: tObj.hour, minute: tObj.minute, second: tObj.second }
                }else{
                    console.error("Time not settable")
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

