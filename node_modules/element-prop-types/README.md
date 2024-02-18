# element-prop-types
React PropTypes for props-elements

[![npm](https://img.shields.io/npm/v/element-prop-types.svg)](https://www.npmjs.com/package/element-prop-types)
[![npm](https://img.shields.io/npm/dt/element-prop-types.svg)](https://www.npmjs.com/package/element-prop-types)
[![GitHub license](https://img.shields.io/github/license/ardalanamini/element-prop-types.svg)](https://github.com/ardalanamini/element-prop-types/blob/master/LICENSE)

## Install

```
npm install --save element-prop-types
```

## Usage

```js
const ElementPropTypes = require('element-prop-types');

const Modal = ({ header, items }) => (
    <div>
        <div>{header}</div>
        <div>{items}</div>
    </div>
);

Modal.propTypes = {
    header: ElementPropTypes.elementOf(Header).isRequired,
    items: PropTypes.arrayOf(ElementPropTypes.elementOf(Item))
};

// render Modal
React.render(
    <Modal
       header={<Header title="This is modal" />}
       items={[
           <Item/>,
           <Item/>,
           <Item/>
       ]}
    />,
    rootElement
);
```

## API

### `elementOf(Component)`

checks the type of a React element
