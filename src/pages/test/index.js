import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import TEST_1 from '../../redux/actions/test';
import locales from '../../common/locales';
import Enums from '@Common/enum';

class Test extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        console.log(Enums);
    }

    clickButton = () => {
        // 同步action
        // this.props.click(Math.random().toFixed(2));
        // redux-thunk 分发异步action
        // this.props.click(function (dispatch) {
        //   setTimeout(() => {
        //     dispatch(TEST_1(Math.random().toFixed(2)));
        //   }, 2000);
        // });
    };

    render() {
        return (
            <>
                <Button className="sdfsfd" onClick={this.clickButton}>
                    test button({this.props.countTest})
                </Button>
                <Button>{locales.get('labels.confirm')}</Button>
            </>
        );
    }
}

const mapStatetoProps = (state, ownProps) => {
    return {
        countTest: state.test.count,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        click: (count) => dispatch(TEST_1(count)),
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Test);
