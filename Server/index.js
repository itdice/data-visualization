const express = require('express');
const app = express();
const PORT = 3880;

const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
const res = require("express/lib/response");
app.use(morgan("dev"));

app.use(express.json());

// =================================================================
app.get("/", async (req, res) => {
    try {
        return res.json({
            test: true
        });
    }
    catch (error) {
        return res.status(500).json({})
    }
});

app.post("/data", async (req, res) => {
    const { startDate, endDate, timeUnit, device, gender, ages, keywordGroups } = req.body;

    console.log(req.body);

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return res.status(400).json({ error: "Empty data" });
    }

    try {
        const request_body = {
            startDate: startDate,
            endDate: endDate,
            timeUnit: timeUnit,
            device: device === "all" ? "" : device,
            gender: gender === "all" ? "" : gender,
            ages: ages === "all" ? [] : [ ages ],
            keywordGroups: keywordGroups
        };

        console.log(request_body);

        const url = "https://openapi.naver.com/v1/datalab/search";
        const headers = {
            "Content-Type": "application/json",
            "X-Naver-Client-Id": process.env.CLIENT_ID,
            "X-Naver-Client-Secret": process.env.CLIENT_SECRET_KEY
        };
        const response = await axios.post(url, request_body,
            { headers: headers }
        );

        fs.writeFile(
            `./uploads/chart.json`,
            JSON.stringify(response.data.results),
            (error) => {
                if (error) {
                    throw error;
                }
            }
        );
        return res.json(response.data.results);
    }
    catch (error) {
        return res.status(500).json({})
    }
});

app.get("/data", async (req, res) => {
    try {
        res.set("content-type", "application/json; charset=utf-8;");
        const tempFile = fs.createReadStream("./uploads/chart.json");
        return tempFile.pipe(res);
    } catch (error) {
        return res.json(error);
    }
});

app.delete("/data", (req, res) => {
    try {
        fs.unlink("./uploads/chart.json", (error) => {
            if (error) {
                return res.json(error);
            }
        });
        return res.json({
            delete: true,
        });
    } catch (error) {
        return res.status(500).json({})
    }
});
// =================================================================

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
