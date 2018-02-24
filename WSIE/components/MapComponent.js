'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import MapView from 'react-native-maps';




// Global const
const LATITUDE_DELTA = 0.018;
const LONGITUDE_DELTA = 0.018;

export default class MapComponent extends Component {
    constructor(props) {
        super(props);

        let region = this.computeRegion([{lat:this.props.userLocationLat, lon:this.props.userLocationLon},{lat:this.props.truckLocationLat, lon:this.props.truckLocationLon}]);
        this.state = {
            region:region,
        }

    }

    computeRegion = (points) => {
        var minX, maxX, minY, maxY;
        
        // init first point
        ((point) => {
            minX = point.lat;
            maxX = point.lat;
            minY = point.lon;
            maxY = point.lon;
        })(points[0]);
        
        // calculate rect
        points.map((point) => {
            minX = Math.min(minX, point.lat);
            maxX = Math.max(maxX, point.lat);
            minY = Math.min(minY, point.lon);
            maxY = Math.max(maxY, point.lon);
        });
        
        var midX = (minX + maxX) / 2;
        var midY = (minY + maxY) / 2;
        var midPoint = [midX, midY];
        
        var deltaX = (maxX - minX) + 0.018;
        var deltaY = (maxY - minY) + 0.018;
        
        return {
            latitude: midX, 
            longitude: midY,
            latitudeDelta: deltaX,
            longitudeDelta: deltaY,
        };
    };

    render(){
        if(this.state.region.latitude) {
            return(
                <View style={styles.mapContainer}>
                    <MapView
                        liteMode={true}
                        style={styles.map}
                        loadingEnabled={true}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude:this.props.truckLocationLat,
                                longitude:this.props.truckLocationLon,
                            }}
                        />

                    </MapView>
                </View>
            );
        }

        return(
            <MapView
                style={styles.map}
                loadingEnabled={true}
                initialRegion={this.props.region}
                showsUserLocation={true}
            >
                
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'absolute',
    },
    mapContainer: {
        width:'94%',
        height:150,
        borderRadius:5,
        overflow:'hidden',
        marginTop:5,
    }
});

