import { env } from 'node:process'

export default function inlineEnvVar({ types: t }) {
  const isLeftSideOfAssignmentExpression = (path) =>
    t.isAssignmentExpression(path.parent) && path.parent.left === path.node

  return {
    name: 'inline-env-var',
    visitor: {
      MemberExpression(path, { opts: { include, exclude } = {} }) {
        if (path.get('object').matchesPattern('process.env')) {
          const key = t.toComputedKey(path.node)
          if (
            t.isStringLiteral(key) &&
            !isLeftSideOfAssignmentExpression(path) &&
            (!include || include.indexOf(key.value) !== -1) &&
            (!exclude || exclude.indexOf(key.value) === -1)
          ) {
            path.replaceWith(t.valueToNode(env[key.value]))
          }
        }
      },
    },
  }
}
