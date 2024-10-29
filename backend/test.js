import { addItem, getItems, updateItem, deleteItem } from './database';

async function testAddItem(){
    const newItem = {
        name: 'Jade Pogi',
        description: 'Gwapo kayni siya'
    };
    const itemId = await addItem(newItem);
    console.log('Added item with ID:', itemId);
}

async function testGetItems(){
    const items = await getItems();
    console.log('Items:', items);

}


async function testUpdateItem(){
    const updatedData = { name: 'DemDem'};
    await updateItem('ITEM_ID', updatedData);
    console.log('item updated successfully');
}

async function testDeleteItem(){
    await deleteItem('ITEM_ID');
    console.log('item deleted successfully');
}

testAddItem();
testGetItems();