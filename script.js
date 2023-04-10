const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

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
  const sortedArr = mergeSort(removeDuplicates(arr));
  const root = buildTree(sortedArr, 0, sortedArr.length - 1);
  console.log(prettyPrint(root));
}

// FUNCTION THAT BUILDS A BALANCED, BINARY SEARCH TREE FROM A GIVEN ARRAY OF DATA
function buildTree(arr, start, end) {
  // Base case
  if (start > end) return null;
  // Set the middle of array as the root
  const middle = Math.floor((start + end) / 2);
  const node = Node(arr[middle]);
  // Recursively get middle of left half of array and make it the left child of the root
  node.left = buildTree(arr, start, middle - 1);
  // Recursively get middle of right half of array and make it the right child of the root
  node.right = buildTree(arr, middle + 1, end);
  return node;
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

// TEST BINARY SEARCH TREE
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
Tree(arr);