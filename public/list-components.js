Vue.component('trick-table',{
    props:['trick-list'],
    template: "<table>\n"+
        "    <tr>\n"+
        "    <th>ID</th>\n"+
        "    <th>Name</th>\n"+
        "    <th>Objects</th>\n"+
        "    <th>Difficulty</th>\n"+
        "    <th>Actions</th>\n"+
        "    </tr>\n"+
        "    <trick-item \n"+
        "        v-for='trick in trickList' \n"+
        "        v-bind:trick='trick'\n"+
        "        v-bind:key='trick.id'>\n"+
        "    </trick-item>\n"+
        "</table>\n"
});

Vue.component('trick-item', {
    props: ['trick'],
    template: "<tr><td>{{ trick.id }}</td>\n"+
        "<td>{{ trick.name }}</td>\n"+
        "<td>{{ trick.objects.count.toString() + ' ' + trick.objects.name }}</td>\n"+
        "<td>{{ trick.learningStage }}</td>\n"+
        "<td><button>Edit</button></td></tr>\n"
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