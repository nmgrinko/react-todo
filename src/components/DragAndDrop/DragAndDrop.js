const DragAndDrop = ({ classNamelabel, idListGroup, onDragAndDrop, children }) => {

    const classNameListGroupItems = classNamelabel.split(' ')[0];

    const onDragStart = (evt) => {
        const li = evt.target.querySelector(`.${classNameListGroupItems}`);
        li.classList.add('selected');
    };

    const onDragEnd = (evt) => {
        const li = evt.target.querySelector(`.${classNameListGroupItems}`);
        li.classList.remove('selected');  
    };

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
        const nextElement = (cursorPosition < currentElementCenter) ?
          currentElement :
          currentElement.nextElementSibling;
        
        return nextElement;
    };

    const onDragOver = (evt) => {
        evt.preventDefault();

        const tasksListElement = evt.target.closest(`#${idListGroup}`);
        const activeElement = tasksListElement.querySelector('.selected');
        const currentElement = evt.target;
       
        const isMoveable = (activeElement !== currentElement) &&
        currentElement.classList.contains(classNameListGroupItems);

        if (!isMoveable) {
            return;
          };

        const nextElement = getNextElement(evt.clientY, currentElement);

        if (
            (nextElement && 
            (activeElement === nextElement.previousElementSibling)) ||
            (activeElement === nextElement)
          ) {
            return;
          };
          
          onDragAndDrop(activeElement.id, nextElement.id);
    }


    return (
        <li className = 'list-group-item' 
            draggable = "true"
            onDragStart = { onDragStart }
            onDragEnd = { onDragEnd }
            onDragOver = { onDragOver }>

            {children}

        </li>)
}

export default DragAndDrop