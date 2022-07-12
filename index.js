express = require('express');
mongoose = require('mongoose');
routes = require("./routes/routes")

Database = 'mongodb url';

mongoose.connect(Database, { useNewUrlParser: true })
    .then(() => {
        console.log("Database Connected");
        app = express();
        app.use(express.json())
        app.use("/", routes);

        app.listen(3000, () => {
            console.log("NodeExpress Server live...");
        });

    })
