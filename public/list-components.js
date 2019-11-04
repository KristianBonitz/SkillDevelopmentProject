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