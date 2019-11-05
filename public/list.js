//TODO: Track total time for activities to be run through
//TODO: Return to database the amount of time, user has spent on activity X
//TODO: List total time done during activity.

var app = new Vue({
    el: '#app',
    data: {
        trickList: [],
    },
    mounted: function(){
        axios
          .get('http://localhost:5432/getData') //todo: add in user id
          .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                var aFormat = {
                    id: i,
                    sysid: response.data[i].id,
                    name: response.data[i].name,
                    description: "",
                    objects: { count: response.data[i].object_count, name: response.data[i].object_name }, //none
                    learningStage: response.data[i].learning_stage, // 3: maintaing
                    tags: [],
                    custom:{}
                }
                this.trickList.push(aFormat)
            }
        })
    },
    watch: {
    },
    methods:{
        editItem: function(id){
            return true
        },
        updateItem: function(id){
            return true
        },
        deleteItem: function(trick){
            if(!trick){
                console.error("delete message run without valid trick")
                return
            }
            index = this.trickList.indexOf(trick)
            this.trickList.splice(index, 1) 
            // removes trick from list
            axios({
                method: 'post',
                url: '/deleteTrick',
                data: {
                    id: trick.sysid,
                }
            });
        }
    }
});

var app = new Vue({
    el: '#add',
    data: {
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
    }
});

