import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';

class CustomModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.isVisible}
                transparent={true}>
                <View style={styles.container}>
                    {this.props.children}
                </View>
            </Modal>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        // backgroundColor: colorWhite
    },
});
export default CustomModal;