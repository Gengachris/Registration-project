const { MongoClient } = require('mongodb');

const mongoUrl = "mongodb://admin:password@localhost:27017/?authSource=admin";

console.log('Attempting to connect to MongoDB...');

MongoClient.connect(mongoUrl, function (err, client) {
    if (err) {
        console.error('Connection error:', err);
        return;
    }

    console.log('✓ Connected successfully to MongoDB!');

    const db = client.db('studentauthdb');

    // Try to insert a test document
    db.collection('users').insertOne({
        test: true,
        name: 'Test User',
        createdAt: new Date()
    }, function (err, result) {
        if (err) {
            console.error('Insert error:', err);
            client.close();
            return;
        }

        console.log('✓ Successfully inserted test document!');
        console.log('Inserted ID:', result.insertedId);

        client.close();
        console.log('✓ Connection closed');
        process.exit(0);
    });
});
