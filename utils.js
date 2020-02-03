require('string.fromcodepoint');

export const toEmoji = code => {
    return String.fromCodePoint(...code.split('-').map(u => '0x' + u));
};
