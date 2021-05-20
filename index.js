const express = require("express");
const app = express();
var axios = require("axios");
const qs = require('qs');

const config = {
  method: "get",
  url: "https://covid19.th-stat.com/api/open/today",
};
const accessCode = 'm0Yy4XRXPYnT5z0iuqmJ42ds1EKM40EB4CsQ7VL6K9e';
const url = "https://notify-api.line.me/api/notify";

app.get("/covid", (req, res) => {
  // res.json({ message: "Ahoy!" });
  getCovid().then(function (result) {
    if (result.status == "200") {
      // console.log(result.data);
      // console.log(JSON.stringify("ติดเชื้อวันนี้ " + result.data.NewConfirmed));
      // console.log(JSON.stringify("รักษาหายวันนี้ " + result.data.NewRecovered));
      // console.log(JSON.stringify("ตายวันนี้ " + result.data.NewDeaths));
      // console.log(JSON.stringify("ติดเชื้อสะสม " + result.data.Confirmed));
      // console.log(JSON.stringify("รักษาอยู่ในร.พ. " + result.data.Hospitalized));
      // console.log(JSON.stringify("วัน-เวลา " + result.data.UpdateDate));

      const jsonData = {
        message: `ติดเชื้อวันนี้ : `+ result.data.NewConfirmed+`\n`+`รักษาหายวันนี้ : `+ result.data.NewRecovered+`\n`+`ตายวันนี้ : `+ result.data.NewDeaths+`\n`+`ติดเชื้อสะสม : `+ result.data.Confirmed+`\n`+`รักษาอยู่ในร.พ. : `+ result.data.Hospitalized+`\n`+`วัน-เวลา : `+ result.data.UpdateDate
      };

      const requestOption = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ` + accessCode,
        },
        data: qs.stringify(jsonData),
        url,
      };
      axios(requestOption)
        .then((axiosRes) => {
          if (axiosRes.status === 200) {
            console.log("Notification Success");
            res.status(201).end();
          }
        })
        .catch((error) => {
          res.status(201).end();
          console.log(error.response.data);
        });
    }
  });
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
    return response;
  } catch (error) {
    console.error(error);
  }
}
app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
