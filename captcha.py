import random

captchas = [
  ['3 \u00d7 7', 21],
  ['4 + 7', 11],
  ['11 \u00d7 2', 22],
  ['11 + 2', 13],
  ['5 + 6', 11],
  ['6 + 7', 13],
  ['14 \u00f7 2', 7],
  ['17 - 3', 14],
  ['2 \u00d7 6', 12],
  ['12 \u00f7 6', 2],
  ['3 \u00d7 5', 15]  
]

def get_captcha():
    num = random.randint(0, len(captchas) - 1)
    return {'num': str(num), 'captcha': captchas[num][0]}

def check_captcha(num: int, result: int):
    if num > len(captchas) - 1:
        return False
    return True if result == captchas[num][1] else False