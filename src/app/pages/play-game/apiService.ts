// import axios from "axios";
//
// try {
//     await axios.post(
//         `http://77.222.37.34:8001/v1/games/8/place_card_on_table?card=${card}`,
//         {},
//         {
//             headers: {
//                 'Authorization': '41969c437fdebb0806f66c88c887c9d01ebaadf52df7382b',
//             },
//         }
//     );
//
//     setSelectedCard(card);
//     setIsAnimating(true);
//
//     setTimeout(() => {
//         setIsAnimating(false);
//         setSelectedCard(null);
//         // cardAnimationContainerRef.current?.appendChild(cardClone);
//         // cardClone.classList.remove('animate');
//         // cardClone.classList.add('final-position');
//
//         setMyCards(prevCards => prevCards.filter(c => c !== card));
//         setTableCards(prevTableCards => [...prevTableCards, card]);
//
//         console.log('Updated Table Cards:', [...tableCards, card]);
//
//     }, 500);
// } catch (error) {
//     console.error('Error placing card on table:', error);
//     e.currentTarget.style.display = 'block'; // Show the card again if the request fails
// }
// };
