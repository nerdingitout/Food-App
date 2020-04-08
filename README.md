# FoodApp
This project aims to detect pictures of food and help the user find restaurants near them that serve the food in the uploaded picture using zomato API.<br><br>
Tools: Node.js, IBM Watson Visual Recognition, Zomato API.<br>
## Architecture Diagram
![](architecture_diagram.PNG)
### Steps:
1- User uploads image to the Application.<br>
2- Image is sent to IBM Watson Visual Recognition to get analyzed.<br>
3- Results are retrieved from Watson VR and processed.<br>
4- Processed results are sent to Zomato API.<br>
5- Results are retrieved from Zomato API and processed.<br>
6- Results are sent to user.<br>
### Features:
- Users can upload local images or online images.<br>
- Users can filter their queries.<br>
- List restaurants that offer the suggested dishes.
