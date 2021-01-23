const DragAndDrop = ({ classNames, idListGroup, children, changeValueItem }) => {

    const classNameListGroupItems = classNames.split(' ')[0];

    const onDragStart = (evt) => {
        evt.target.classList.add('selected');
    };

    const onDragEnd = (evt) => {
        evt.target.classList.remove('selected');
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

        tasksListElement.insertBefore(activeElement, nextElement);
    }



    return (
        <li className = { classNames } 
            draggable = "true"
            onDragStart = { onDragStart }
            onDragEnd = { onDragEnd }
            onDragOver = { onDragOver }
            onDoubleClick = { changeValueItem }>

            {children}

        </li>)
}

export default DragAndDrop