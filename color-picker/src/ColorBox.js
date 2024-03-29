import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';

import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { copied: false };
        this.chageCopyState = this.chageCopyState.bind(this);
    }
    chageCopyState(){
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1000);
        });
    }

    render () {
        const { 
            name, 
            background, 
            moreUrl, 
            showingFullPalette, 
            classes 
        } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.chageCopyState}>
                <div style={{ background }} className={classes.colorBox}>
                    <div 
                        style={{ background }} 
                        className={classNames(classes.copyOverlay, {
                            [classes.showOverlay]: copied
                        })} 
                    />
                    <div 
                        className={classNames(classes.copyMessage, {
                            [classes.showMessage]: copied
                        })}
                    >
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton} >
                            Copy
                        </button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);
