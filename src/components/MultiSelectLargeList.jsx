import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";
import Select from 'react-select';
import '../styles/multiSelectLargeList.css'
import { useState } from "react";

let height = 45;

class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;
      const customStyle = this.props.selectProps.styles.menuList();
  
      return (
        <List
          style={customStyle}
          height={180}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
}

const MultiSelectLargeList = (props) => {
    const placeholder = props.placeholder
    const defaultValue = props.defaultValue
    const options = props.options
    const styles = props.styles
    height = props.itemHeight ? props.itemHeight : 55
    return (
        <>
            <Select
                components={{ MenuList }}
                placeholder={placeholder}
                defaultValue={defaultValue}
                isMulti
                name="multi-select"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={props.onUpdate}
                styles={styles}
            />
        </>
    );
};

export default MultiSelectLargeList;