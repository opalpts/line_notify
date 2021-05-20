const express = require("express");
const app = express();
var axios = require("axios");

var config = {
  method: "get",
  url: "https://covid19.th-stat.com/api/open/today",
};

app.get("/", (req, res) => {
  res.json({ message: "Ahoy!" });
  getCovid().then(function(result) {
    console.log(result);
 })
});

async function getCovid() {
  try {
    const response = await axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      .catch(function (error) {
        console.log(error);
      });
    //   console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
