# api 24/25

Voor dit vak moeten we een web app maken waarin we content en web api's gebruiken.


## week 1

De eerste dag was ik ziek, waardoor ik de uitleg over het gebruik van een node server gemist heb. Gelukkig heb ik bij project tech ook een web app met node gemaakt dus kon ik mezelf aardig redden.

Ik heb deze week ook mijn plan in elkaar gezet voor de uiteindelijke app:

### plan

Ik wil de spotify API gebruiken om een soort web versie van spotify te maken, waar je ook op kunt inloggen met je spotify account zodat je nummers kunt toevoegen aan je playlisten.

### feedback

De feedback was vrij kort deze week, omdat ik nog niet een heel concreet idee had. Het komt erop neer dat ik wat meer van het spotify idee af moet en iets erbij moet toevoegen


## week 2

Ik ben deze week begonnen met het zorgen voor een verbinding met de api en de server, dat ging opzich vrij soepel, alleen de accestoken die je terugkrijgt van spotify is maar geldig voor een uur. Als de server langer dan een uur aanstaat werkt de token niet meer, om dat op te lossen had ik een functie nodig die de token automatisch vernieuwd nadat de token over datum is. Dit heb ik aan chatGPT gevraagd, omdat ik zelf niet wist hoe ik dat het beste kon aanpakken.

Toen de token werkte ben ik wat endpoints gaan uitproberen, als eerste heb ik informatie opgehaald van een album, met als idee dat ik een aantal albums ging laten zien. Toen ik verder ging kijken op de documentatie van de api zag ik dat er een endpoint was voor nummer reccomendations, na een uur proberen kwam ik erachter dat dat endpoint deprecated was dus dat ging niet door. Maar het idee van random nummers genereren leek me alsnog leuk om te doen dus ik heb gekeken naar andere endpoints.

Toen kwam ik de search endpoint tegen, waar je op de volgende eigenschappen kunt filteren:

1. album
2. artiest
3. track
4. jaar (of 1 jaar of een range)
5. genre

Ondanks dat dit is bedoeld om nummers te zoeken kun je het ook gebruiken om een nummer te vinden aan de hand van een aantal filter waarden. Dit endpoint geeft standaard 10 nummers op en maximaal 50. Ook is er een endpoint dat genres teruggeeft wat ik kan gebruiken om een random genre te geven of om genres op te halen om dynamisch in het filter te zetten. Helaas is dit endpoint ook deprecated, dus dat word hem ook niet.


### plan 2.0

Ik wil een app maken dat nummers geeft op basis van een aantal filters dat de gebruiker kan instellen. Vervolgens kan de gebruiker dan die nummers luisteren en misschien toevoegen aan een playlist of meer nummers van een album of artiest beluisteren.


### feedback

Declan vond mijn idee om te filteren erg leuk, alleen vond hij het nog steeds te veel op spotify lijken. Hij vertelde ook dat vorig jaar studenten spelletjes gemaakt hadden en dat zette me aan het denken: Wat als ik een quiz maak waarbij de gebruiker een aantal genres kan uitkiezen en dan per nummer een genre krijgt voorgeschoteld. Dan moet je raden welk nummer welk genre is en voor elk goed antwoord krijg je een punt, dat gaat door tot in de oneindigheid met dezelfde genres en als je wilt kun je andere genres kiezen.


## week 3

Nu ik mijn idee heb gevormd wil ik een lijstje maken van alles wat ik nodig heb om dit werkend te maken en uitleg over api endpoints en functies


**Pagina 1 - genres uitkiezen**

Hier zou ik het liefste genres uit de api ophalen, maar dat kan niet dus dit word gewoon een statische pagina met een formulier waar je drie genres kunt uitkiezen. Ik wil dat met een javascript bestand de gebruiker geforceerd word om precies drie genres te kiezen, niet meer en niet minder.


**Pagina 2 - genres raden**

Hier komen drie nummers te staan met daaronder drie genres die je moet koppelen aan de nummers, dat gebeurd in een formulier wat op de achtergrond is gekoppeld aan een formulier met javascript en wat je doorstuurt naar een pagina waar de antwoorden worden gecheckt. Ik wil het kiezen van genres doen met blokken die je moet verslepen, hiervoor heb ik de **drag- and drop API** nodig.


**Pagina 3 - antwoorden laten zien**

Op deze pagina word op de achtergrond gecheckt welke antwoorden goed zijn en alle goede antwoorden krijgen een groene kleur en de foute een rode kleur. Verder is de pagina hetzelfde als de vorige, hierna kun je doorklikken naar pagina 2 wat het een oneindige loop maakt.

Ik heb deze week vooral aan de indeling en de styling van de eerste twee pagina's gewerkt.


## week 4

Deze week ben ik vooral bezig geweest met de drag and drop API, ik had verwacht dat dit sneller zou gaan, maar dat viel erg tegen dus dat kostte een hoop tijd. Uiteindelijk is dit alles wat ik heb kunnen doen.


## herkansing

Ik heb in de vakantie een hoop dingen gedaan, hier is een korte samenvatting van de belangrijkste dingen:

1. het kiezen van de genres is op de achtergrond met js gekoppeld aan een formulier dat de antwoorden invult zodat het gecheckt kan worden
2. als het formulier is ingevuld word de gebruiker doorgestuurd naar een pagina waar de antwoorden gecheckt worden en worden opgeteld bij de totaalscore
3. de antwoorden worden opgeslagen in de server en via een popover laten zien in de pagina waar je kunt raden, zodra je die wegklikt kun je nieuwe nummers raden
