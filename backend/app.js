const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/patients', require('./routes/patients'));
app.use('/tokens', require('./routes/tokens'));
app.use('/prescriptions', require('./routes/prescriptions'));
app.use('/bills', require('./routes/bills'));
app.use('/logs', require('./routes/logs'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));