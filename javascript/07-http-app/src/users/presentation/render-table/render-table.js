import usersStore from '../../store/users-store.js';
import { deleteUserById } from '../../use-cases/delete-user-by-id.js';
import { showModal } from '../render-modal/render-modal.js';
import '../render-table/render-table.css';

let table;

const creatTable = () => {

    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');

    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tablebeBody = document.createElement('tbody');
    table.append( tableHeaders, tablebeBody );

    return table;
};


/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = ( event ) => {
    
    const elemet = event.target.closest('.select-user');
    
    if( !elemet ) return;

    const id = elemet.getAttribute('data-id');

    showModal( id );
};

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async( event ) => {
    
    const elemet = event.target.closest('.delete-user');
    
    if( !elemet ) return;

    const id = elemet.getAttribute('data-id');

    try {

        await deleteUserById( id );
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();

    } catch (error) {

        console.log(error);
        alert('No se pudo eliminar');        
    }
};


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {

    const users = usersStore.getUsers();

    if( !table ){
        table = creatTable();
        element.append( table );

        table.addEventListener('click', ( event ) => tableSelectListener( event ));
        table.addEventListener('click', ( event ) => tableDeleteListener( event ));
    }

    let tableHTML = '';
    users.forEach( user => {
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                    <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
                </td>
            </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTML;
};
