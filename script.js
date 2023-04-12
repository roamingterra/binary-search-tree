// NODE FACTORY FUNCTION
function Node(value = null, left = null, right = null) {
  return {
    data: value,
    leftNode: left,
    rightNode: right,
  };
}

// TREE FACTORY FUNCTION
function Tree(arr) {
  // METHOD THAT BUILDS A BALANCED, BINARY SEARCH TREE FROM A GIVEN ARRAY OF DATA
  function buildTree(arr, start, end) {
    // Base case
    if (start > end) return null;
    // Set the middle of array as the root
    const middle = Math.floor((start + end) / 2);
    const node = Node(arr[middle]);
    // Recursively get middle of left half of array and make it the left child of the root
    node.leftNode = buildTree(arr, start, middle - 1);
    // Recursively get middle of right half of array and make it the right child of the root
    node.rightNode = buildTree(arr, middle + 1, end);
    return node;
  }
  const sortedArr = mergeSort(removeDuplicates(arr));
  const root = buildTree(sortedArr, 0, sortedArr.length - 1)
    ? buildTree(sortedArr, 0, sortedArr.length - 1)
    : null;

  return {
    root: root,
    insert: function (value) {
      let currentNode = this.root;
      if (this.root === null) {
        this.root = Node(value);
        return this.root;
      }
      if (arr.find((element) => element === value)) {
        console.log("Already exists in Binary Tree");
        return root;
      } else {
        const searchTree = function (currentNode) {
          // Base case 1
          if (value < currentNode.data && !currentNode.leftNode) {
            currentNode.leftNode = Node(value);
            return root;
          }
          // Base case 2
          if (value > currentNode.data && !currentNode.rightNode) {
            currentNode.rightNode = Node(value);
            return root;
          }
          // Recursive case 1
          if (value < currentNode.data && currentNode.leftNode) {
            return searchTree(currentNode.leftNode);
          }
          // Recursive case 2
          if (value > currentNode.data && currentNode.rightNode) {
            return searchTree(currentNode.rightNode);
          }
        };
        searchTree(currentNode);
      }
    },
    delete: function (value) {
      let currentNode = this.root;
      const minValue = function (node) {
        let minValue = node.data;
        while (node.leftNode !== null) {
          minValue = node.leftNode.data;
          node = node.leftNode;
        }
        return minValue;
      };
      const deleteRecursively = function (currentNode, value) {
        // Base case: node not found
        if (currentNode === null) return currentNode;
        if (value < currentNode.data) {
          currentNode.leftNode = deleteRecursively(currentNode.leftNode, value);
        } else if (value > currentNode.data) {
          currentNode.rightNode = deleteRecursively(
            currentNode.rightNode,
            value
          );
        } else {
          // Node to be deleted found
          // Case 1: Node with only one child or no child
          if (currentNode.leftNode === null) {
            return currentNode.rightNode;
          } else if (currentNode.rightNode === null) {
            return currentNode.leftNode;
          }
          // Case 2: Node with two children
          // Get the inorder successor (smallest in the right subtree)
          currentNode.data = minValue(currentNode.rightNode);
          // Delete the inorder successor
          currentNode.rightNode = deleteRecursively(
            currentNode.rightNode,
            currentNode.data
          );
        }
        return currentNode;
      };
      this.root = deleteRecursively(this.root, value);
    },
    find: function (value) {
      let node = this.root;
      const searchTree = function (currentNode) {
        // Base case
        if (currentNode.data === value) {
          return currentNode;
        }
        // Recursive case
        if (value > currentNode.data) {
          if (!currentNode.rightNode) {
            console.log("Cannot be found");
            return null;
          }
          return searchTree(currentNode.rightNode);
        } else if (value < currentNode.data) {
          if (!currentNode.leftNode) {
            console.log("Cannot be found");
            return null;
          }
          return searchTree(currentNode.leftNode);
        }
      };
      const result = searchTree(node);
      return result;
    },

    levelOrder: function (func) {
      if (this.root === null) return null;
      let currentNode = this.root;
      const results = [];
      const queue = [];
      queue.push(currentNode);
      while (queue.length) {
        // Add children of node at the top of the queue to the queue
        if (queue[0].leftNode) {
          let newNode = queue[0].leftNode;
          queue.push(newNode);
        }
        if (queue[0].rightNode) {
          let newNode = queue[0].rightNode;
          queue.push(newNode);
        }
        // Pass first node of queue to func
        if (func) results.push(func(queue[0]));
        else results.push(queue[0].data);
        // remove first node from queue
        queue.shift();
      }
      return results;
    },

    preorder: function (func) {
      if (this.root === null) return null;
      let currentNode = this.root;
      const results = [];

      const preOrderTraversal = function (currentNode) {
        // Base condition
        if (currentNode === null) return;
        // Touch current node
        results.push(func(currentNode));
        // Recursive conditions
        preOrderTraversal(currentNode.leftNode);
        preOrderTraversal(currentNode.rightNode);
      };
      preOrderTraversal(currentNode);
      return results;
    },

    inorder: function (func) {
      if (this.root === null) return null;
      let currentNode = this.root;
      const results = [];

      const inOrderTraversal = function (currentNode) {
        // Base condition
        if (currentNode === null) return;
        // Recursive condition1
        inOrderTraversal(currentNode.leftNode);
        // Touch current node
        results.push(func(currentNode));
        // Recursive condition2
        inOrderTraversal(currentNode.rightNode);
      };
      inOrderTraversal(currentNode);
      return results;
    },

    postorder: function (func) {
      if (this.root === null) return null;
      let currentNode = this.root;
      const results = [];

      const postOrderTraversal = function (currentNode) {
        // Base condition
        if (currentNode === null) return;
        // Recursive conditions
        postOrderTraversal(currentNode.leftNode);
        postOrderTraversal(currentNode.rightNode);
        // Touch current node
        results.push(func(currentNode));
      };
      postOrderTraversal(currentNode);
      return results;
    },

    height: function (node) {
      if (node === null) return null;
      let height = 0;
      let currentNode = node;

      while (currentNode.leftNode || currentNode.rightNode) {
        if (currentNode.leftNode) {
          currentNode = currentNode.leftNode;
        } else if (currentNode.rightNode) {
          currentNode = currentNode.rightNode;
        }
        height++;
      }

      return height;
    },

    depth: function (node) {
      if (node === null) return null;
      let depth = 0;
      let currentNode = this.root;

      while (node.data !== currentNode.data) {
        if (node.data < currentNode.data) {
          currentNode = currentNode.leftNode;
        } else if (node.data > currentNode.data) {
          currentNode = currentNode.rightNode;
        }
        depth++;
      }

      return depth;
    },
  };
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function mergeSort(arr) {
  // Base case
  if (arr.length < 2) return arr;
  // Recursive case
  else {
    const midpoint = Math.floor(arr.length / 2);
    // Sort left half of array
    const leftHalf = mergeSort(arr.slice(0, midpoint));
    // Sort right half of array
    const rightHalf = mergeSort(arr.slice(midpoint));
    // Merge both halves
    const result = [];
    for (
      let i = 0, j = 0, k = 0;
      i < leftHalf.length || j < rightHalf.length;
      k++
    ) {
      // When there is a left over number to be sorted
      if (i >= leftHalf.length || j >= rightHalf.length) {
        if (i >= leftHalf.length) {
          result[k] = rightHalf[j];
          j++;
        } else if (j >= rightHalf.length) {
          result[k] = leftHalf[i];
          i++;
        }
      }
      // Regular sorting condition
      if (i < leftHalf.length && j < rightHalf.length) {
        if (leftHalf[i] < rightHalf[j]) {
          result[k] = leftHalf[i];
          i++;
        } else if (leftHalf[i] > rightHalf[j]) {
          result[k] = rightHalf[j];
          j++;
        }
      }
    }
    return result;
  }
}

// FUNCTION TO PRINT THE TREE TO THE SCREEN
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// TEST BINARY SEARCH TREE
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree1 = Tree(arr);
console.log(prettyPrint(tree1.root));

tree1.insert(100);
console.log(prettyPrint(tree1.root));

tree1.delete(324);
console.log(prettyPrint(tree1.root));

console.log(tree1.find(7));

// console.log(
//   tree1.levelOrder(function (node) {
//     if (node.data > 10) return true;
//     else return false;
//   })
// );

// console.log(
//   tree1.preorder(function (node) {
//     if (node.data > 0) return node.data;
//     else return false;
//   })
// );

// console.log(
//   tree1.inorder(function (node) {
//     if (node.data > 0) return node.data;
//     else return false;
//   })
// );

// console.log(
//   tree1.postorder(function (node) {
//     if (node.data > 0) return node.data;
//     else return false;
//   })
// );
// console.log(tree1.find(0));

console.log(tree1.height(tree1.find(4)));

console.log(tree1.depth(tree1.find(100)));
