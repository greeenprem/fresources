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

app.get('/api/*', async (req, res) => {
    const subUrl = req.path
    console.log(subUrl);
    if (!subUrl) {
        return res.status(400).send('No query URL provided');
    }

    try {
        const response = await axios.get(("https://fresources.tech/"+subUrl), { headers: { Cookie: Object.keys(burp0_cookies).map(key => `${key}=${burp0_cookies[key]}`).join('; ') } });
        res.set('content-type', response.headers['content-type']);
        console.log(response.data)
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error fetching URL');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
