import { Injectable } from '@angular/core';
import { Iquestion } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions:Iquestion[]

  constructor() {
    this.questions = [
      {
        id: 'a1b3ew',
        summary: 'How to create a Stack Overflow clone with Angular, Expressjs, and MSSQL',
        details: `
        RouterLinkActive if used with queryParams needs to be an exact match, So the above solution will not work. There was a proposal to make routeLinkActiveOptions but was dropped by Angular team.

        You can define your own method to identify active.

        Here in the below snippet I am defining a method is link active will return true if the path url minus any query params matches the routerlink path passed from template.

        import {Router} from '@angular/router';

        constructor(private router: Router){
        
        }

        isLinkActive(link) {
          const url = this.router.url;
          return link.id === url.substring(1, url.indexOf('?'));
        }
        From the template assign class="active" if the method isLinkActive returns true

        <li *ngFor="let link of links" [class.active]="isLinkActive(link)">
          <a [routerLink]="'/'+link.id" [queryParams]="{ activeOnly: false }">{{link.name}}</a>
        </li>
        Stackblitz : https://stackblitz.com/edit/angular-8f7jk8
        `,
        askedDate: '6/13/2023, 12:47:44 PM',
        editedDate: null,
        askedBy: 'JoshuaOndieki'
      },
      {
        id: 'b2c4fg',
        summary: 'How to create a React app with TypeScript',
        details: `
          Here's how you can create a new React app with TypeScript:
    
          npx create-react-app my-app --template typescript
    
          This will create a new React app with TypeScript support. You can then start the app by running:
    
          cd my-app
          npm start
    
          That's it! You now have a new React app with TypeScript.
        `,
        askedDate: '6/14/2023, 9:12:01 AM',
        editedDate: null,
        askedBy: 'JaneDoe'
      },
      {
        id: 'c3d5hi',
        summary: 'How to use async/await in JavaScript',
        details: `
          Here's an example of how to use async/await in JavaScript:
    
          async function getData() {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            return data;
          }
    
          getData().then(data => {
            console.log(data);
          });
    
          This code defines an async function called getData that fetches data from an API and returns it as JSON. The function uses the await keyword to wait for the response and data to be fetched before returning it.
    
          The function is then called using the .then() method to log the data to the console.
    
          I hope this helps!
        `,
        askedDate: '6/15/2023, 2:34:19 PM',
        editedDate: null,
        askedBy: 'JohnSmith'
      },
      {
        id: 'd6e7jk',
        summary: 'How to style HTML elements with CSS',
        details: `
        To style HTML elements with CSS, you can use the following methods:
        1. Inline styles: You can apply styles directly to HTML elements using the "style" attribute. For example:
  
        <div style="color: red;">This text will be red.</div>
      
        2. Internal stylesheets: You can define styles within the <style> tag in the <head> section of your HTML document. For example:
        
        <style>
          .red-text {
            color: red;
          }
        </style>
      
        <div class="red-text">This text will be red.</div>
      
        3. External stylesheets: You can create a separate CSS file and link it to your HTML document using the <link> tag. For example:
        
        <link rel="stylesheet" href="styles.css">
      
        // styles.css
        .red-text {
          color: red;
        }
      
        <div class="red-text">This text will be red.</div>
      
        These are some of the common methods for styling HTML elements with CSS. You can use various CSS properties and selectors to achieve different styles.
      `,
      askedDate: '6/16/2023, 11:27:43 AM',
      editedDate: null,
      askedBy: 'EmilyJones'
      },
      {
        id: 'e8f9lm',
        summary: 'How to implement a binary search algorithm in Python',
        details: `
        Here's an example of how to implement a binary search algorithm in Python:
        def binary_search(arr, target):
        low = 0
        high = len(arr) - 1
  
        while low <= high:
            mid = (low + high) // 2
            guess = arr[mid]
  
            if guess == target:
                return mid
            elif guess < target:
                low = mid + 1
            else:
                high = mid - 1
  
        return -1
  
    # Example usage
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target = 7
  
    result = binary_search(numbers, target)
    if result != -1:
        print("Element found at index", result)
    else:
        print("Element not found")
  
    This code defines a binary_search function that takes an array (arr) and a target value as input. It uses a while loop to repeatedly divide the search space in half until the target value is found or the search space is empty.
  
    The function returns the index of the target value if found, or -1 if the target value is not present in the array.
  
    In the example usage, the binary_search function is called with a sorted array of numbers and a target value. The result is then printed based on whether the element is found or not.
  
    I hope this helps!
  `,
  askedDate: '6/18/2023, 3:55:22 PM',
  editedDate: null,
  askedBy: 'MichaelBrown'
  },
  {
  id: 'g10h12p',
summary: 'How to create a responsive website layout with CSS Grid',
details: `
To create a responsive website layout with CSS Grid, you can follow these steps:

vbnet
Copy code
  1. Create the HTML structure: Define the main container element and divide it into grid items using appropriate HTML elements (e.g., <div>).

  2. Apply CSS Grid properties to the container: Set the display property of the container to "grid" and define the grid layout using properties like "grid-template-columns" and "grid-template-rows". You can also use shorthand properties like "grid-template" for a more compact syntax.

   .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr; /* Example column layout */
      grid-template-rows: auto; /* Example row layout */
    }

  3. Style the grid items: Apply specific styles to the grid items using CSS selectors. You can use properties like "grid-column" and "grid-row" to control the item's placement within the grid.

    .item {
      grid-column: 1 / span 2; /* Example column span */
      grid-row: 1; /* Example row placement */
    }

  4. Add media queries for responsiveness: Use media queries to define different grid layouts for different screen sizes. Adjust the grid properties to create a responsive layout that adapts to various devices.

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr; /* Adjusted column layout for smaller screens */
      }
    }

  5. Test and refine: Test your layout on different devices and make adjustments as needed to ensure a smooth responsive experience.

  By following these steps, you can create a responsive website layout using CSS Grid.

  If you'd like more detailed examples or further assistance, feel free to ask!
`,
askedDate: '6/20/2023, 9:41:14 AM',
editedDate: null,
askedBy: 'SophiaDavis'
  }
    ]
  }

  get allQuestions() {
    return this.questions
  }
}
