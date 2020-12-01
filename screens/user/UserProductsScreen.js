import React from 'react';
import { FlatList, Platform, Button, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as producstActions from '../../store/actions/products';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {
            productId: id
        });
    };

    const deleteHandler = (id) => {
        Alert.alert('Tem certeza?', 'Deseja realmente excluir esse item?', [
            {
                text: 'Não',
                style: 'default'
            },
            {
                text: 'Sim',
                style: 'destructive',
                onPress: () => {
                    dispatch(producstActions.deleteProduct(id));
                }
            }
        ])
    };

    if(userProducts.length === 0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Nenhum produto encontrado.</Text>
        </View>
    }

    return <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
                editProductHandler(itemData.item.id);
            }}
        >
            <Button
                color={Colors.primary}
                title="Editar"
                onPress={() => {
                    editProductHandler(itemData.item.id);
                }}
            />
            <Button
                color={Colors.primary}
                title="Remover"
                onPress={deleteHandler.bind(this, itemData.item.id)}
            />
        </ProductItem>}
    />
};

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Admin',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Add'
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }} />
        </HeaderButtons>),
    }
}

export default UserProductScreen;