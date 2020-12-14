require('dotenv').config();

const sampleRepository = require('./repositories/sample-repository');

(async () => {
  try {
    const obj = {
      id: '1',
      message: 'hello world',
      updatedAt: new Date(),
    };
    await sampleRepository.putItem(obj);
    const item = await sampleRepository.getItemById('1');
    console.log('getItem', item);
  } catch (err) {
    console.log(err, err.stack);
  }
})();
