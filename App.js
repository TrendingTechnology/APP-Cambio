import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard} from 'react-native';

import Picker from './src/components/Picker';
import api from './src/Services/API';

export default function App(){ 
    const [moedas, setMoedas]    = useState([]);
    const [loading, setLoading]  = useState(true);

    const [moedaSelecionada, setMoedaSelecionada] = useState(null);
    const [moedaBValor, setMoedaBValor] = useState(0);
    
    //Armazenar o valor que 
    const [valorMoeda, setValorMoeda] = useState(null);
    const [valorConvertido, setValorConvertido] = useState(0);


    //carregar Moedas.
    useEffect(() => {
    // Criando a Função Assincrona 
    async function CarregaMoedas(){
      //await serve para esperar esta requisição
        const response = await api.get('all');
        //tranqformando o objeto da API em Array 
        let arrayMoedas = []
        Object.keys(response.data).map((key) => {
            arrayMoedas.push({
                key: key,
                label: key,
                value:key
            })  
        })
      
       setMoedas(arrayMoedas);
       setLoading(false); 

    }

    CarregaMoedas();
    },[]);

    // função para converter numero, uma vez que ele esta setado no input 
    // assincrona => buscar na API a moeda que foi selecionada
    async function converter(){
      if(moedaSelecionada === null || moedaBValor === 0){
        alert('Por Favor Selecione uma moeda');
        return;
      }
      // devolve quanto que é 1 dolar||(Moeda) convertido para reais
      const response = await api.get(`all/${moedaSelecionada}-BRL`);
      
      let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor));
      setValorConvertido(`R$ ${resultado.toFixed(2)}`);
      setValorMoeda(moedaBValor);

      Keyboard.dismiss();
    }

    if(loading){
      return(
        <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
        <ActivityIndicator color="#000" size={45} />
        </View>
      )
    }else{

      return(
        <View style={styles.container}>
          <View style={{alignItems:'center', justifyContent:'center', marginBottom:10}}>
            <Text style={{fontSize:15, fontWeight: 'bold', fontStyle:'italic'}}>
                Infelismente a nossa Moeda NÃO vale Nada :(..  #Partiu Gringa  
            </Text>
          </View>
          <View style={styles.areaMoeda}>
              <Text style={styles.titulo}>Selecione sua Moeda</Text>
              <Picker  moedas={moedas} onChange={ (moeda) => setMoedaSelecionada(moeda)  }  />
          </View>
          
          <View style={styles.AreaValor}>
              <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
              <TextInput 
                  placeholder= "Ex: 150"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(valor) => setMoedaBValor(valor)}
              />
          </View>
  
          <TouchableOpacity style={styles.btnArea}  onPress={converter}>
              <Text style={styles.botaotexto}>Converter</Text> 
          </TouchableOpacity>
          
          {valorConvertido !== 0 && (
              <View style={styles.areaResultado}>
                   <Text style={styles.valorConvertido}>
                    R$  {valorMoeda} Para {moedaSelecionada} 
                   </Text>
                   <Text style={[styles.valorConvertido, {fontSize: 15, margin: 10}] }>
                        Corresponde a 
                   </Text>
                   <Text style={styles.valorConvertido}>
                        {valorConvertido}
                   </Text>
              </View> 
          )}

        </View>
    );

      
  }


}

const styles = StyleSheet.create({
   container:{
     flex:1,
     alignItems:'center',
     backgroundColor: '#CCC',
     paddingTop: 40
   },
   areaMoeda:{
     width:'90%',
     backgroundColor: '#F9F9F9',
     padding : 9,
     borderTopLeftRadius: 10,
     borderTopRightRadius:10,
     marginBottom: 5
   },
   titulo:{
     fontSize: 16,
     color: '#000',
     paddingTop: 8,
     paddingLeft: 5,
     paddingBottom:10
   },
   AreaValor:{
     width: '90%',
     backgroundColor: '#009898',
     paddingBottom: 8,
    paddingTop:7
   },
   input:{
     width: '100%',
     paddingTop: 10,
     height: 45,
     fontSize: 22,
     marginTop: 20,
     color: '#000',
     padding: 10
   },
   btnArea:{
     width: '90%',
     backgroundColor: '#FB4b57',
     height: 45,
     borderBottomLeftRadius: 10,
     borderBottomRightRadius:10,
     justifyContent: 'center',
     alignItems: 'center',
   },
   botaotexto:{
     fontSize: 20,
     color: '#FFF',
     fontWeight: 'bold',
   },
   areaResultado:{
     width: '90%',
     backgroundColor: '#FFF',
     marginTop: 35,
     alignItems: 'center',
     justifyContent: 'center',
     padding: 10
   },
   valorConvertido:{
      fontSize: 39,
      color: '#000',
      fontWeight: 'bold'
   }


});
