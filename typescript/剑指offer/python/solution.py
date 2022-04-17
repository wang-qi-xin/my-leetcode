# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Codec:
  """
  剑指 Offer 37. 序列化二叉树

  """
  def serialize(self, root):
      """Encodes a tree to a single string.
      :type root: TreeNode
      :rtype: str
      """
      if not root:
          return "*,"
      s = str(root.val) + ","
      s += self.serialize(root.left)
      s += self.serialize(root.right)
      return s


  def deserialize(self, data):
      """Decodes your encoded data to tree.
      :type data: str
      :rtype: TreeNode
      """
      self.data = data.split(",")[:-1:]
      self.index = -1
      return self.deserialize2()

  def deserialize2(self):
      self.index += 1
      if self.index >= len(self.data):
          return None
      node = None
      while "*" != self.data[self.index]:
          node = TreeNode(self.data[self.index])
          node.left = self.deserialize2()
          node.right = self.deserialize2()
      return node
      

      

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)

code = Codec()
s = code.serialize(root)
n = code.deserialize(s)
print(s)
print(n.val)
