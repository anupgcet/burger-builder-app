import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux';

const withErrorHandler = (WrappedCompoent, axios) => {
    return class extends Component{

        state = {
            error : null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error : null})
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error})
            })
        }

        componentWillUnmount(){
           console.log('will unmount'+this.reqInterceptor, this.resInterceptor);
            
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({error : null})
        }
        render(){
            return (
                <Aux >
                    <Modal show={this.state.error}
                      modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                <WrappedCompoent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;