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

            if(activity.custom.time){
                var timeObj = activity.custom.time;
                this.time = { hour: timeObj.hour, minute: timeObj.minute, second: timeObj.second };
            }else if(activity.learningStage == 3){ //maintaining
                this.time = { hour: 0, minute: 0, second: 30 };
            }else if(activity.learningStage == 2){ //improving
                this.time = { hour: 0, minute: 1, second: 15 };
            }else if(activity.learningStage == 1){ //learning
                this.time = { hour: 0, minute: 2, second: 30 };
            }else if(activity.learningStage == 0){ //custom
                this.time = { hour: 0, minute: 0, second: 0 };
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