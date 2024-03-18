const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
app.use(cors());



app.use(express.static(path.join(__dirname, 'public')));

// Define your routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'selectCourse.html'));
});


const burp0_cookies = {
    "__Secure-next-auth.session-token": "a6f35133-dea1-48d2-94c3-c2ea42394b29"
};

app.get('/api', (req, res) => {
    const query_url = req.query.query;
    console.log(query_url);
    if (!query_url) {
        return res.status(400).send('No query URL provided');
    }

    axios.get(query_url, { headers: { Cookie: Object.keys(burp0_cookies).map(key => `${key}=${burp0_cookies[key]}`).join('; ') } })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.error(error);
            res.status(error.response?.status || 500).send(error.response?.data || error.message);
        });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
