import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "./app/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
} from "./app/screens";
import Home2 from "./app/screens/Home2";
import Home3 from "./app/screens/Home3";
import Home4 from "./app/screens/Home4";
import LanguageSelectionScreen from "./app/screens/LanguageSelectionScreen";
import StartScreenL from "./app/screens/StartScreenL";
import QuestionScreen from "./app/screens/QuestionScreen";
import Qs from "./app/screens/Qs";
import EnglishAlphabetScreen from "./app/screens/EnglishAlphabetScreen";
import PurposeScreen from "./app/screens/PurposeScreen";
import Purpose1Screen from "./app/screens/Purpose1Screen";
import Purpose2Screen from "./app/screens/Purpose2Screen";
import Purpose3Screen from "./app/screens/Purpose3Screen";
import Purpose4Screen from "./app/screens/Purpose4Screen";
import GoalsScreen from "./app/screens/GoalsScreen";
import BeginnersScreen from './app/screens/beginner/BeginnersScreen';
import AlphabetScreen from './app/screens/beginner/AlphabetScreen';
import LetterDetailScreen from "./app/screens/beginner/LetterDetailScreen";
import WordsStartingWithA from "./app/screens/beginner/WordsStartingWithA";
import WordsStartingWithAScreen_temp from "./app/screens/beginner/WordsStartingWithAScreen_temp";
import WordPuzzleScreen from "./app/screens/beginner/WordPuzzleScreen";
import WordPuzzleScreen2 from "./app/screens/beginner/WordPuzzleScreen2";
import WordPuzzleScreen3 from "./app/screens/beginner/WordPuzzleScreen3";
import WordPuzzleScreen4 from "./app/screens/beginner/WordPuzzleScreen4";
import WordPuzzleScreen5 from "./app/screens/beginner/WordPuzzleScreen5";
import VerbsScreen from "./app/screens/beginner/VerbsScreen";
import PronounsScreen from "./app/screens/basic/PronounsScreen";
import Pronoun2 from "./app/screens/basic/Pronoun2";
import TensesScreen from "./app/screens/basic/TensesScreen";
import SimpleTenseScreen from "./app/screens/basic/SimpleTenseScreen";
import SimplePresent from "./app/screens/basic/SimplePresent";
import SimplePast from "./app/screens/basic/SimplePast";
import FutureTense from "./app/screens/basic/FutureTense";
import SimplePresentAffirmative from "./app/screens/basic/SimplePresentAffirmative";
import SentencePuzzleScreen1 from "./app/screens/basic/SentencePuzzleScreen1";
import SentencePuzzleScreen2 from "./app/screens/basic/SentencePuzzleScreen2";
import PuzzleScreen3 from "./app/screens/basic/PuzzleScreen3";
import SimplePastTenseAffirmative from './app/screens/basic/SimplePastTenseAffirmative';
import SimplePastPuzzle1 from './app/screens/basic/SimplePastPuzzle1';
import SimplePastPuzzle2 from './app/screens/basic/SimplePastPuzzle2';
import SimplePastPuzzle3 from './app/screens/basic/SimplePastPuzzle3';
import FutureTensePuzzleScreen1 from './app/screens/basic/FutureTensePuzzleScreen1';
import FutureTensePuzzleScreen2 from "./app/screens/basic/FutureTensePuzzleScreen2";
import LetterDetailScreenB from "./app/screens/beginner/B/LetterDetailScreenB";
import WordsStartingWithB from "./app/screens/beginner/B/WordsStartingWithB";
import WordPuzzleScreenB1 from "./app/screens/beginner/B/WordPuzzleScreenB1";
import WordPuzzleScreenB2 from "./app/screens/beginner/B/WordPuzzleScreenB2";
import WordPuzzleScreenB3 from "./app/screens/beginner/B/WordPuzzleScreenB3";
import WordPuzzleScreenB4 from "./app/screens/beginner/B/WordPuzzleScreenB4";
import WordPuzzleScreenB5 from "./app/screens/beginner/B/WordPuzzleScreenB5";
import BPuzzleProgressScreen from "./app/screens/beginner/B/BPuzzleProgressScreen";
import APuzzleProgressScreen from "./app/screens/beginner/APuzzleProgressScreen";
import LetterDetailScreenC from "./app/screens/beginner/C/LetterDetailScreenC";
import WordsStartingWithC from "./app/screens/beginner/C/WordsStartingWithC";
import WordPuzzleScreenC1 from "./app/screens/beginner/C/WordPuzzleScreenC1";
import WordPuzzleScreenC2 from "./app/screens/beginner/C/WordPuzzleScreenC2";
import WordPuzzleScreenC3 from "./app/screens/beginner/C/WordPuzzleScreenC3";
import WordPuzzleScreenC4 from "./app/screens/beginner/C/WordPuzzleScreenC4";
import WordPuzzleScreenC5 from "./app/screens/beginner/C/WordPuzzleScreenC5";
import VerbsScreenC from "./app/screens/beginner/C/VerbsScreenC";
import CPuzzleProgressScreen from "./app/screens/beginner/C/CPuzzleProgressScreen";
import LetterDetailScreenD from "./app/screens/beginner/D/LetterDetailScreenD";
import WordsStartingWithD from "./app/screens/beginner/D/WordsStartingWithD";
import WordPuzzleScreenD1 from "./app/screens/beginner/D/WordPuzzleScreenD1";
import WordPuzzleScreenD2 from "./app/screens/beginner/D/WordPuzzleScreenD2";
import WordPuzzleScreenD3 from "./app/screens/beginner/D/WordPuzzleScreenD3";
import WordPuzzleScreenD4 from "./app/screens/beginner/D/WordPuzzleScreenD4";
import WordPuzzleScreenD5 from "./app/screens/beginner/D/WordPuzzleScreenD5";
import VerbsScreenD from "./app/screens/beginner/D/VerbsScreenD";
import DPuzzleProgressScreen from "./app/screens/beginner/D/DPuzzleProgressScreen";
import LetterDetailScreenE from "./app/screens/beginner/E/LetterDetailScreenE";
import WordsStartingWithEScreen from "./app/screens/beginner/E/WordsStartingWithEScreen";
import WordPuzzleScreenE1 from "./app/screens/beginner/E/WordPuzzleScreenE1";
import WordPuzzleScreenE2 from "./app/screens/beginner/E/WordPuzzleScreenE2";
import WordPuzzleScreenE3 from "./app/screens/beginner/E/WordPuzzleScreenE3";
import WordPuzzleScreenE4 from "./app/screens/beginner/E/WordPuzzleScreenE4";
import WordPuzzleScreenE5 from "./app/screens/beginner/E/WordPuzzleScreenE5";
import VerbsScreenE from "./app/screens/beginner/E/VerbsScreenE";
import EPuzzleProgressScreen from "./app/screens/beginner/E/EPuzzleProgressScreen";
import LetterDetailScreenF from "./app/screens/beginner/F/LetterDetailScreenF";
import WordsStartingWithFScreen from "./app/screens/beginner/F/WordsStartingWithFScreen";
import WordPuzzleScreenF1 from "./app/screens/beginner/F/WordPuzzleScreenF1";
import WordPuzzleScreenF2 from "./app/screens/beginner/F/WordPuzzleScreenF2";
import WordPuzzleScreenF3 from "./app/screens/beginner/F/WordPuzzleScreenF3";
import WordPuzzleScreenF4 from "./app/screens/beginner/F/WordPuzzleScreenF4";
import WordPuzzleScreenF5 from "./app/screens/beginner/F/WordPuzzleScreenF5";
import VerbsScreenF from "./app/screens/beginner/F/VerbsScreenF";
import FPuzzleProgressScreen from "./app/screens/beginner/F/FPuzzleProgressScreen";
import LetterDetailScreenG from "./app/screens/beginner/G/LetterDetailScreenG";
import WordsStartingWithGScreen from "./app/screens/beginner/G/WordsStartingWithGScreen";
import WordPuzzleScreenG1 from "./app/screens/beginner/G/WordPuzzleScreenG1";
import WordPuzzleScreenG2 from "./app/screens/beginner/G/WordPuzzleScreenG2";
import WordPuzzleScreenG3 from "./app/screens/beginner/G/WordPuzzleScreenG3";
import WordPuzzleScreenG4 from "./app/screens/beginner/G/WordPuzzleScreenG4";
import WordPuzzleScreenG5 from "./app/screens/beginner/G/WordPuzzleScreenG5";
import VerbsScreenG from "./app/screens/beginner/G/VerbsScreenG";
import GPuzzleProgressScreen from "./app/screens/beginner/G/GPuzzleProgressScreen";
import LetterDetailScreenH from "./app/screens/beginner/H/LetterDetailScreenH";
import WordsStartingWithHScreen from "./app/screens/beginner/H/WordsStartingWithHScreen";
import WordPuzzleScreenH1 from "./app/screens/beginner/H/WordPuzzleScreenH1";
import WordPuzzleScreenH2 from "./app/screens/beginner/H/WordPuzzleScreenH2";
import WordPuzzleScreenH3 from "./app/screens/beginner/H/WordPuzzleScreenH3";
import WordPuzzleScreenH4 from "./app/screens/beginner/H/WordPuzzleScreenH4";
import WordPuzzleScreenH5 from "./app/screens/beginner/H/WordPuzzleScreenH5";
import VerbsScreenH from "./app/screens/beginner/H/VerbsScreenH";
import HPuzzleProgressScreen from "./app/screens/beginner/H/HPuzzleProgressScreen";
import LetterDetailScreenI from "./app/screens/beginner/I/LetterDetailScreenI";
import WordsStartingWithIScreen from "./app/screens/beginner/I/WordsStartingWithIScreen";
import WordPuzzleScreenI1 from "./app/screens/beginner/I/WordPuzzleScreenI1";
import WordPuzzleScreenI2 from "./app/screens/beginner/I/WordPuzzleScreenI2";
import WordPuzzleScreenI3 from "./app/screens/beginner/I/WordPuzzleScreenI3";
import WordPuzzleScreenI4 from "./app/screens/beginner/I/WordPuzzleScreenI4";
import WordPuzzleScreenI5 from "./app/screens/beginner/I/WordPuzzleScreenI5";
import VerbsScreenI from "./app/screens/beginner/I/VerbsScreenI";
import IPuzzleProgressScreen from "./app/screens/beginner/I/IPuzzleProgressScree";
import LetterDetailScreenJ from "./app/screens/beginner/J/LetterDetailScreenJ";
import WordsStartingWithJScreen from "./app/screens/beginner/J/WordsStartingWithJScreen";
import WordPuzzleScreenJ1 from "./app/screens/beginner/J/WordPuzzleScreenJ1";
import WordPuzzleScreenJ2 from "./app/screens/beginner/J/WordPuzzleScreenJ2";
import WordPuzzleScreenJ3 from "./app/screens/beginner/J/WordPuzzleScreenJ3";
import WordPuzzleScreenJ4 from "./app/screens/beginner/J/WordPuzzleScreenJ4";
import WordPuzzleScreenJ5 from "./app/screens/beginner/J/WordPuzzleScreenJ5";
import VerbsScreenJ from "./app/screens/beginner/J/VerbsScreenJ";
import JPuzzleProgressScreen from "./app/screens/beginner/J/JPuzzleProgressScreen";
import LetterDetailScreenK from "./app/screens/beginner/K/LetterDetailScreenK";
import WordsStartingWithKScreen from "./app/screens/beginner/K/WordsStartingWithKScreen";
import WordPuzzleScreenK1 from "./app/screens/beginner/K/WordPuzzleScreenK1";
import WordPuzzleScreenK2 from "./app/screens/beginner/K/WordPuzzleScreenK2";
import WordPuzzleScreenK3 from "./app/screens/beginner/K/WordPuzzleScreenK3";
import WordPuzzleScreenK4 from "./app/screens/beginner/K/WordPuzzleScreenK4";
import WordPuzzleScreenK5 from "./app/screens/beginner/K/WordPuzzleScreenK5";
import VerbsScreenK from "./app/screens/beginner/K/VerbsScreenK";
import KPuzzleProgressScreen from "./app/screens/beginner/K/KPuzzleProgressScreen";
import LetterDetailScreenL from "./app/screens/beginner/L/LetterDetailScreenL";
import WordsStartingWithLScreen from "./app/screens/beginner/L/WordsStartingWithLScreen";
import WordPuzzleScreenL1 from "./app/screens/beginner/L/WordPuzzleScreenL1";
import WordPuzzleScreenL2 from "./app/screens/beginner/L/WordPuzzleScreenL2";
import WordPuzzleScreenL3 from "./app/screens/beginner/L/WordPuzzleScreenL3";
import WordPuzzleScreenL4 from "./app/screens/beginner/L/WordPuzzleScreenL4";
import WordPuzzleScreenL5 from "./app/screens/beginner/L/WordPuzzleScreenL5";
import VerbsScreenL from "./app/screens/beginner/L/VerbsScreenL";
import LPuzzleProgressScreen from "./app/screens/beginner/L/LPuzzleProgressScreen";
import LetterDetailScreenM from "./app/screens/beginner/M/LetterDetailScreenM";
import WordsStartingWithMScreen from "./app/screens/beginner/M/WordsStartingWithMScreen";
import WordPuzzleScreenM1 from "./app/screens/beginner/M/WordPuzzleScreenM1";
import WordPuzzleScreenM2 from "./app/screens/beginner/M/WordPuzzleScreenM2";
import WordPuzzleScreenM3 from "./app/screens/beginner/M/WordPuzzleScreenM3";
import WordPuzzleScreenM4 from "./app/screens/beginner/M/WordPuzzleScreenM4";
import WordPuzzleScreenM5 from "./app/screens/beginner/M/WordPuzzleScreenM5";
import VerbsScreenM from "./app/screens/beginner/M/VerbsScreenM";
import MPuzzleProgressScreen from "./app/screens/beginner/M/MPuzzleProgressScreen";
import LetterDetailScreenN from "./app/screens/beginner/N/LetterDetailScreenN";
import WordsStartingWithNScreen from "./app/screens/beginner/N/WordsStartingWithNScreen";
import WordPuzzleScreenN1 from "./app/screens/beginner/N/WordPuzzleScreenN1";
import WordPuzzleScreenN2 from "./app/screens/beginner/N/WordPuzzleScreenN2";
import WordPuzzleScreenN3 from "./app/screens/beginner/N/WordPuzzleScreenN3";
import WordPuzzleScreenN4 from "./app/screens/beginner/N/WordPuzzleScreenN4";
import WordPuzzleScreenN5 from "./app/screens/beginner/N/WordPuzzleScreenN5";
import VerbsScreenN from "./app/screens/beginner/N/VerbsScreenN";
import NPuzzleProgressScreen from "./app/screens/beginner/N/NPuzzleProgressScreen";
import LetterDetailScreenO from "./app/screens/beginner/O/LetterDetailScreenO";
import WordsStartingWithOScreen from "./app/screens/beginner/O/WordsStartingWithOScreen";
import WordPuzzleScreenO1 from "./app/screens/beginner/O/WordPuzzleScreenO1";
import WordPuzzleScreenO2 from "./app/screens/beginner/O/WordPuzzleScreenO2";
import WordPuzzleScreenO3 from "./app/screens/beginner/O/WordPuzzleScreenO3";
import WordPuzzleScreenO4 from "./app/screens/beginner/O/WordPuzzleScreenO4";
import WordPuzzleScreenO5 from "./app/screens/beginner/O/WordPuzzleScreenO5";
import VerbsScreenO from "./app/screens/beginner/O/VerbsScreenO";
import OPuzzleProgressScreen from "./app/screens/beginner/O/OPuzzleProgressScreen";
import LetterDetailScreenP from "./app/screens/beginner/P/LetterDetailScreenP";
import WordsStartingWithPScreen from "./app/screens/beginner/P/WordsStartingWithPScreen";
import WordPuzzleScreenP1 from "./app/screens/beginner/P/WordPuzzleScreenP1";


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Home2" component={Home2} />
          <Stack.Screen name="Home3" component={Home3} />
          <Stack.Screen name="Home4" component={Home4} />
          <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
          <Stack.Screen name="StartScreenL" component={StartScreenL} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
          <Stack.Screen name="Qs" component={Qs} />
          <Stack.Screen name="Purpose" component={PurposeScreen} />
          <Stack.Screen name="EnglishAlphabetScreen" component={EnglishAlphabetScreen} />
          <Stack.Screen name="Purpose1" component={Purpose1Screen} />
          <Stack.Screen name="Purpose2" component={Purpose2Screen} />
          <Stack.Screen name="Purpose3" component={Purpose3Screen} />
          <Stack.Screen name="Goals" component={GoalsScreen} />
          <Stack.Screen name="Purpose4" component={Purpose4Screen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="BeginnersScreen" component={BeginnersScreen} />
          <Stack.Screen name="AlphabetScreen" component={AlphabetScreen} />
          <Stack.Screen name="LetterDetail" component={LetterDetailScreen} />
          <Stack.Screen name="WordsStartingWithAScreen_temp" component={WordsStartingWithAScreen_temp} />
          <Stack.Screen name="WordsStartingWithA" component={WordsStartingWithA} />
          <Stack.Screen name="WordPuzzleScreen" component={WordPuzzleScreen} />
          <Stack.Screen name="WordPuzzleScreen2" component={WordPuzzleScreen2} />
          <Stack.Screen name="WordPuzzleScreen3" component={WordPuzzleScreen3} />
          <Stack.Screen name="WordPuzzleScreen4" component={WordPuzzleScreen4} />
          <Stack.Screen name="WordPuzzleScreen5" component={WordPuzzleScreen5} />
          <Stack.Screen name="VerbsScreen" component={VerbsScreen} />
          <Stack.Screen name="PronounsScreen" component={PronounsScreen} />
          <Stack.Screen name="Pronoun2" component={Pronoun2} />
          <Stack.Screen name="TensesScreen" component={TensesScreen} />
          <Stack.Screen name="SimpleTenseScreen" component={SimpleTenseScreen} />
          <Stack.Screen name="SimplePresent" component={SimplePresent} />
          <Stack.Screen name="SimplePast" component={SimplePast} options={{ headerShown: false }} />
          <Stack.Screen name="SimplePastTenseAffirmative" component={SimplePastTenseAffirmative} options={{ headerShown: false }} />
          <Stack.Screen name="SimplePastPuzzle1" component={SimplePastPuzzle1} options={{ headerShown: false }} />
          <Stack.Screen name="SimplePastPuzzle2" component={SimplePastPuzzle2} options={{ headerShown: false }}/>
          <Stack.Screen name="SimplePastPuzzle3"component={SimplePastPuzzle3} options={{ headerShown: false }}/>
          <Stack.Screen name="FutureTense" component={FutureTense} />
          <Stack.Screen name="SimplePresentAffirmative" component={SimplePresentAffirmative} />
          <Stack.Screen name="SentencePuzzleScreen1" component={SentencePuzzleScreen1} />
          <Stack.Screen name="SentencePuzzleScreen2" component={SentencePuzzleScreen2} />
          <Stack.Screen name="PuzzleScreen3" component={PuzzleScreen3} options={{ headerShown: false }} />
          <Stack.Screen name="FutureTensePuzzleScreen1" component={FutureTensePuzzleScreen1} options={{ headerShown: false }} />
          <Stack.Screen name="FutureTensePuzzleScreen2" component={FutureTensePuzzleScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="LetterDetailScreenB" component={LetterDetailScreenB} />
          <Stack.Screen name="WordsStartingWithB" component={WordsStartingWithB} />
          <Stack.Screen name="WordPuzzleScreenB1" component={WordPuzzleScreenB1} />
          <Stack.Screen name="WordPuzzleScreenB2" component={WordPuzzleScreenB2} />
          <Stack.Screen name="WordPuzzleScreenB3" component={WordPuzzleScreenB3} />
          <Stack.Screen name="WordPuzzleScreenB4" component={WordPuzzleScreenB4} />
          <Stack.Screen name="WordPuzzleScreenB5" component={WordPuzzleScreenB5} />
          <Stack.Screen name="BPuzzleProgressScreen" component={BPuzzleProgressScreen} />
          <Stack.Screen name="APuzzleProgressScreen" component={APuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenC" component={LetterDetailScreenC} />
          <Stack.Screen name="WordsStartingWithC" component={WordsStartingWithC} />
          <Stack.Screen name="WordPuzzleScreenC1" component={WordPuzzleScreenC1} />
          <Stack.Screen name="WordPuzzleScreenC2" component={WordPuzzleScreenC2} />
          <Stack.Screen name="WordPuzzleScreenC3" component={WordPuzzleScreenC3} />
          <Stack.Screen name="WordPuzzleScreenC4" component={WordPuzzleScreenC4} />
          <Stack.Screen name="WordPuzzleScreenC5" component={WordPuzzleScreenC5} />
          <Stack.Screen name="VerbsScreenC" component={VerbsScreenC} />
          <Stack.Screen name="CPuzzleProgressScreen" component={CPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenD" component={LetterDetailScreenD} />
          <Stack.Screen name="WordsStartingWithD" component={WordsStartingWithD} />
          <Stack.Screen name="WordPuzzleScreenD1" component={WordPuzzleScreenD1} />
          <Stack.Screen name="WordPuzzleScreenD2" component={WordPuzzleScreenD2} />
          <Stack.Screen name="WordPuzzleScreenD3" component={WordPuzzleScreenD3} />
          <Stack.Screen name="WordPuzzleScreenD4" component={WordPuzzleScreenD4} />
          <Stack.Screen name="WordPuzzleScreenD5" component={WordPuzzleScreenD5} />
          <Stack.Screen name="VerbsScreenD" component={VerbsScreenD} />
          <Stack.Screen name="DPuzzleProgressScreen" component={DPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenE" component={LetterDetailScreenE} />
          <Stack.Screen name="WordsStartingWithEScreen" component={WordsStartingWithEScreen} />
          <Stack.Screen name="WordPuzzleScreenE1" component={WordPuzzleScreenE1} />
          <Stack.Screen name="WordPuzzleScreenE2" component={WordPuzzleScreenE2} />
          <Stack.Screen name="WordPuzzleScreenE3" component={WordPuzzleScreenE3} />
          <Stack.Screen name="WordPuzzleScreenE4" component={WordPuzzleScreenE4} />
          <Stack.Screen name="WordPuzzleScreenE5" component={WordPuzzleScreenE5} />
          <Stack.Screen name="VerbsScreenE" component={VerbsScreenE} />
          <Stack.Screen name="EPuzzleProgressScreen" component={EPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenF" component={LetterDetailScreenF} />
          <Stack.Screen name="WordsStartingWithFScreen" component={WordsStartingWithFScreen} />
          <Stack.Screen name="WordPuzzleScreenF1" component={WordPuzzleScreenF1} />
          <Stack.Screen name="WordPuzzleScreenF2" component={WordPuzzleScreenF2} />
          <Stack.Screen name="WordPuzzleScreenF3" component={WordPuzzleScreenF3} />
          <Stack.Screen name="WordPuzzleScreenF4" component={WordPuzzleScreenF4} />
          <Stack.Screen name="WordPuzzleScreenF5" component={WordPuzzleScreenF5} />
          <Stack.Screen name="VerbsScreenF" component={VerbsScreenF} />
          <Stack.Screen name="FPuzzleProgressScreen" component={FPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenG" component={LetterDetailScreenG} />
          <Stack.Screen name="WordsStartingWithGScreen" component={WordsStartingWithGScreen} />
          <Stack.Screen name="WordPuzzleScreenG1" component={WordPuzzleScreenG1} />
          <Stack.Screen name="WordPuzzleScreenG2" component={WordPuzzleScreenG2} />
          <Stack.Screen name="WordPuzzleScreenG3" component={WordPuzzleScreenG3} />
          <Stack.Screen name="WordPuzzleScreenG4" component={WordPuzzleScreenG4} />
          <Stack.Screen name="WordPuzzleScreenG5" component={WordPuzzleScreenG5} />
          <Stack.Screen name="VerbsScreenG" component={VerbsScreenG} />
          <Stack.Screen name="GPuzzleProgressScreen" component={GPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenH" component={LetterDetailScreenH} />
          <Stack.Screen name="WordsStartingWithHScreen" component={WordsStartingWithHScreen} />
          <Stack.Screen name="WordPuzzleScreenH1" component={WordPuzzleScreenH1} />
          <Stack.Screen name="WordPuzzleScreenH2" component={WordPuzzleScreenH2} />
          <Stack.Screen name="WordPuzzleScreenH3" component={WordPuzzleScreenH3} />
          <Stack.Screen name="WordPuzzleScreenH4" component={WordPuzzleScreenH4} />
          <Stack.Screen name="WordPuzzleScreenH5" component={WordPuzzleScreenH5} />
          <Stack.Screen name="VerbsScreenH" component={VerbsScreenH} />
          <Stack.Screen name="HPuzzleProgressScreen" component={HPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenI" component={LetterDetailScreenI} />
          <Stack.Screen name="WordsStartingWithIScreen" component={WordsStartingWithIScreen} />
          <Stack.Screen name="WordPuzzleScreenI1" component={WordPuzzleScreenI1} />
          <Stack.Screen name="WordPuzzleScreenI2" component={WordPuzzleScreenI2} />
          <Stack.Screen name="WordPuzzleScreenI3" component={WordPuzzleScreenI3} />
          <Stack.Screen name="WordPuzzleScreenI4" component={WordPuzzleScreenI4} />
          <Stack.Screen name="WordPuzzleScreenI5" component={WordPuzzleScreenI5} />
          <Stack.Screen name="VerbsScreenI" component={VerbsScreenI} />
          <Stack.Screen name="IPuzzleProgressScreen" component={IPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenJ" component={LetterDetailScreenJ} />
          <Stack.Screen name="WordsStartingWithJScreen" component={WordsStartingWithJScreen} />
          <Stack.Screen name="WordPuzzleScreenJ1" component={WordPuzzleScreenJ1} />
          <Stack.Screen name="WordPuzzleScreenJ2" component={WordPuzzleScreenJ2} />
          <Stack.Screen name="WordPuzzleScreenJ3" component={WordPuzzleScreenJ3} />
          <Stack.Screen name="WordPuzzleScreenJ4" component={WordPuzzleScreenJ4} />
          <Stack.Screen name="WordPuzzleScreenJ5" component={WordPuzzleScreenJ5} />
          <Stack.Screen name="VerbsScreenJ" component={VerbsScreenJ} />
          <Stack.Screen name="JPuzzleProgressScreen" component={JPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenK" component={LetterDetailScreenK} />
          <Stack.Screen name="WordsStartingWithKScreen" component={WordsStartingWithKScreen} />
          <Stack.Screen name="WordPuzzleScreenK1" component={WordPuzzleScreenK1} />
          <Stack.Screen name="WordPuzzleScreenK2" component={WordPuzzleScreenK2} />
          <Stack.Screen name="WordPuzzleScreenK3" component={WordPuzzleScreenK3} />
          <Stack.Screen name="WordPuzzleScreenK4" component={WordPuzzleScreenK4} />
          <Stack.Screen name="WordPuzzleScreenK5" component={WordPuzzleScreenK5} />
          <Stack.Screen name="VerbsScreenK" component={VerbsScreenK} />  
          <Stack.Screen name="KPuzzleProgressScreen" component={KPuzzleProgressScreen} />    
          <Stack.Screen name="LetterDetailScreenL" component={LetterDetailScreenL} />   
          <Stack.Screen name="WordsStartingWithLScreen" component={WordsStartingWithLScreen} /> 
          <Stack.Screen name="WordPuzzleScreenL1" component={WordPuzzleScreenL1} />
          <Stack.Screen name="WordPuzzleScreenL2" component={WordPuzzleScreenL2} />
          <Stack.Screen name="WordPuzzleScreenL3" component={WordPuzzleScreenL3} />
          <Stack.Screen name="WordPuzzleScreenL4" component={WordPuzzleScreenL4} />
          <Stack.Screen name="WordPuzzleScreenL5" component={WordPuzzleScreenL5} />
          <Stack.Screen name="VerbsScreenL" component={VerbsScreenL} />
          <Stack.Screen name="LPuzzleProgressScreen" component={LPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenM" component={LetterDetailScreenM} />
          <Stack.Screen name="WordsStartingWithMScreen" component={WordsStartingWithMScreen} />
          <Stack.Screen name="WordPuzzleScreenM1" component={WordPuzzleScreenM1} />
          <Stack.Screen name="WordPuzzleScreenM2" component={WordPuzzleScreenM2} />
          <Stack.Screen name="WordPuzzleScreenM3" component={WordPuzzleScreenM3} />
          <Stack.Screen name="WordPuzzleScreenM4" component={WordPuzzleScreenM4} />
          <Stack.Screen name="WordPuzzleScreenM5" component={WordPuzzleScreenM5} />
          <Stack.Screen name="VerbsScreenM" component={VerbsScreenM} />
          <Stack.Screen name="MPuzzleProgressScreen" component={MPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenN" component={LetterDetailScreenN} />
          <Stack.Screen name="WordsStartingWithNScreen" component={WordsStartingWithNScreen} />
          <Stack.Screen name="WordPuzzleScreenN1" component={WordPuzzleScreenN1} />
          <Stack.Screen name="WordPuzzleScreenN2" component={WordPuzzleScreenN2} />
          <Stack.Screen name="WordPuzzleScreenN3" component={WordPuzzleScreenN3} />
          <Stack.Screen name="WordPuzzleScreenN4" component={WordPuzzleScreenN4} />
          <Stack.Screen name="WordPuzzleScreenN5" component={WordPuzzleScreenN5} />
          <Stack.Screen name="VerbsScreenN" component={VerbsScreenN} />
          <Stack.Screen name="NPuzzleProgressScreen" component={NPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenO" component={LetterDetailScreenO} />
          <Stack.Screen name="WordsStartingWithOScreen" component={WordsStartingWithOScreen} />
          <Stack.Screen name="WordPuzzleScreenO1" component={WordPuzzleScreenO1} />
          <Stack.Screen name="WordPuzzleScreenO2" component={WordPuzzleScreenO2} />
          <Stack.Screen name="WordPuzzleScreenO3" component={WordPuzzleScreenO3} />
          <Stack.Screen name="WordPuzzleScreenO4" component={WordPuzzleScreenO4} />
          <Stack.Screen name="WordPuzzleScreenO5" component={WordPuzzleScreenO5} />
          <Stack.Screen name="VerbsScreenO" component={VerbsScreenO} />
          <Stack.Screen name="OPuzzleProgressScreen" component={OPuzzleProgressScreen} />
          <Stack.Screen name="LetterDetailScreenP" component={LetterDetailScreenP} />
          <Stack.Screen name="WordsStartingWithPScreen" component={WordsStartingWithPScreen} />
          <Stack.Screen name="WordPuzzleScreenP1" component={WordPuzzleScreenP1} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
