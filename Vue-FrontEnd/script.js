//TODO: How to use outside API for activity list

var app = new Vue({
    el: '#app',
    data: {
        time: {hour: 0, minute: 2, second: 0},
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
            this.clock = window.setInterval(this.updateTime, 100);
            this.inProgress = true;
        },
        stopTime: function(){
            console.log('stop');
            clearInterval(this.clock);
            this.inProgress = false;
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
});