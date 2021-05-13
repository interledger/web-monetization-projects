.class La/o/a/a/k$b;
.super La/o/a/a/k$e;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/o/a/a/k;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "b"
.end annotation


# instance fields
.field private d:[I

.field e:La/g/a/a/b;

.field f:F

.field g:La/g/a/a/b;

.field h:F

.field i:I

.field j:F

.field k:F

.field l:F

.field m:F

.field n:Landroid/graphics/Paint$Cap;

.field o:Landroid/graphics/Paint$Join;

.field p:F


# direct methods
.method public constructor <init>()V
    .locals 3

    invoke-direct {p0}, La/o/a/a/k$e;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, La/o/a/a/k$b;->f:F

    const/high16 v1, 0x3f800000    # 1.0f

    iput v1, p0, La/o/a/a/k$b;->h:F

    const/4 v2, 0x0

    iput v2, p0, La/o/a/a/k$b;->i:I

    iput v1, p0, La/o/a/a/k$b;->j:F

    iput v0, p0, La/o/a/a/k$b;->k:F

    iput v1, p0, La/o/a/a/k$b;->l:F

    iput v0, p0, La/o/a/a/k$b;->m:F

    sget-object v0, Landroid/graphics/Paint$Cap;->BUTT:Landroid/graphics/Paint$Cap;

    iput-object v0, p0, La/o/a/a/k$b;->n:Landroid/graphics/Paint$Cap;

    sget-object v0, Landroid/graphics/Paint$Join;->MITER:Landroid/graphics/Paint$Join;

    iput-object v0, p0, La/o/a/a/k$b;->o:Landroid/graphics/Paint$Join;

    const/high16 v0, 0x40800000    # 4.0f

    iput v0, p0, La/o/a/a/k$b;->p:F

    return-void
.end method

.method public constructor <init>(La/o/a/a/k$b;)V
    .locals 3

    invoke-direct {p0, p1}, La/o/a/a/k$e;-><init>(La/o/a/a/k$e;)V

    const/4 v0, 0x0

    iput v0, p0, La/o/a/a/k$b;->f:F

    const/high16 v1, 0x3f800000    # 1.0f

    iput v1, p0, La/o/a/a/k$b;->h:F

    const/4 v2, 0x0

    iput v2, p0, La/o/a/a/k$b;->i:I

    iput v1, p0, La/o/a/a/k$b;->j:F

    iput v0, p0, La/o/a/a/k$b;->k:F

    iput v1, p0, La/o/a/a/k$b;->l:F

    iput v0, p0, La/o/a/a/k$b;->m:F

    sget-object v0, Landroid/graphics/Paint$Cap;->BUTT:Landroid/graphics/Paint$Cap;

    iput-object v0, p0, La/o/a/a/k$b;->n:Landroid/graphics/Paint$Cap;

    sget-object v0, Landroid/graphics/Paint$Join;->MITER:Landroid/graphics/Paint$Join;

    iput-object v0, p0, La/o/a/a/k$b;->o:Landroid/graphics/Paint$Join;

    const/high16 v0, 0x40800000    # 4.0f

    iput v0, p0, La/o/a/a/k$b;->p:F

    iget-object v0, p1, La/o/a/a/k$b;->d:[I

    iput-object v0, p0, La/o/a/a/k$b;->d:[I

    iget-object v0, p1, La/o/a/a/k$b;->e:La/g/a/a/b;

    iput-object v0, p0, La/o/a/a/k$b;->e:La/g/a/a/b;

    iget v0, p1, La/o/a/a/k$b;->f:F

    iput v0, p0, La/o/a/a/k$b;->f:F

    iget v0, p1, La/o/a/a/k$b;->h:F

    iput v0, p0, La/o/a/a/k$b;->h:F

    iget-object v0, p1, La/o/a/a/k$b;->g:La/g/a/a/b;

    iput-object v0, p0, La/o/a/a/k$b;->g:La/g/a/a/b;

    iget v0, p1, La/o/a/a/k$b;->i:I

    iput v0, p0, La/o/a/a/k$b;->i:I

    iget v0, p1, La/o/a/a/k$b;->j:F

    iput v0, p0, La/o/a/a/k$b;->j:F

    iget v0, p1, La/o/a/a/k$b;->k:F

    iput v0, p0, La/o/a/a/k$b;->k:F

    iget v0, p1, La/o/a/a/k$b;->l:F

    iput v0, p0, La/o/a/a/k$b;->l:F

    iget v0, p1, La/o/a/a/k$b;->m:F

    iput v0, p0, La/o/a/a/k$b;->m:F

    iget-object v0, p1, La/o/a/a/k$b;->n:Landroid/graphics/Paint$Cap;

    iput-object v0, p0, La/o/a/a/k$b;->n:Landroid/graphics/Paint$Cap;

    iget-object v0, p1, La/o/a/a/k$b;->o:Landroid/graphics/Paint$Join;

    iput-object v0, p0, La/o/a/a/k$b;->o:Landroid/graphics/Paint$Join;

    iget p1, p1, La/o/a/a/k$b;->p:F

    iput p1, p0, La/o/a/a/k$b;->p:F

    return-void
.end method

.method private a(ILandroid/graphics/Paint$Cap;)Landroid/graphics/Paint$Cap;
    .locals 1

    if-eqz p1, :cond_2

    const/4 v0, 0x1

    if-eq p1, v0, :cond_1

    const/4 v0, 0x2

    if-eq p1, v0, :cond_0

    return-object p2

    :cond_0
    sget-object p1, Landroid/graphics/Paint$Cap;->SQUARE:Landroid/graphics/Paint$Cap;

    return-object p1

    :cond_1
    sget-object p1, Landroid/graphics/Paint$Cap;->ROUND:Landroid/graphics/Paint$Cap;

    return-object p1

    :cond_2
    sget-object p1, Landroid/graphics/Paint$Cap;->BUTT:Landroid/graphics/Paint$Cap;

    return-object p1
.end method

.method private a(ILandroid/graphics/Paint$Join;)Landroid/graphics/Paint$Join;
    .locals 1

    if-eqz p1, :cond_2

    const/4 v0, 0x1

    if-eq p1, v0, :cond_1

    const/4 v0, 0x2

    if-eq p1, v0, :cond_0

    return-object p2

    :cond_0
    sget-object p1, Landroid/graphics/Paint$Join;->BEVEL:Landroid/graphics/Paint$Join;

    return-object p1

    :cond_1
    sget-object p1, Landroid/graphics/Paint$Join;->ROUND:Landroid/graphics/Paint$Join;

    return-object p1

    :cond_2
    sget-object p1, Landroid/graphics/Paint$Join;->MITER:Landroid/graphics/Paint$Join;

    return-object p1
.end method

.method private a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Landroid/content/res/Resources$Theme;)V
    .locals 7

    const/4 v0, 0x0

    iput-object v0, p0, La/o/a/a/k$b;->d:[I

    const-string v0, "pathData"

    invoke-static {p2, v0}, La/g/a/a/i;->a(Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;)Z

    move-result v0

    if-nez v0, :cond_0

    return-void

    :cond_0
    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroid/content/res/TypedArray;->getString(I)Ljava/lang/String;

    move-result-object v0

    if-eqz v0, :cond_1

    iput-object v0, p0, La/o/a/a/k$e;->b:Ljava/lang/String;

    :cond_1
    const/4 v0, 0x2

    invoke-virtual {p1, v0}, Landroid/content/res/TypedArray;->getString(I)Ljava/lang/String;

    move-result-object v0

    if-eqz v0, :cond_2

    invoke-static {v0}, La/g/b/b;->a(Ljava/lang/String;)[La/g/b/b$b;

    move-result-object v0

    iput-object v0, p0, La/o/a/a/k$e;->a:[La/g/b/b$b;

    :cond_2
    const/4 v5, 0x1

    const/4 v6, 0x0

    const-string v4, "fillColor"

    move-object v1, p1

    move-object v2, p2

    move-object v3, p3

    invoke-static/range {v1 .. v6}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Landroid/content/res/Resources$Theme;Ljava/lang/String;II)La/g/a/a/b;

    move-result-object v0

    iput-object v0, p0, La/o/a/a/k$b;->g:La/g/a/a/b;

    const/16 v0, 0xc

    iget v1, p0, La/o/a/a/k$b;->j:F

    const-string v2, "fillAlpha"

    invoke-static {p1, p2, v2, v0, v1}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result v0

    iput v0, p0, La/o/a/a/k$b;->j:F

    const/16 v0, 0x8

    const/4 v1, -0x1

    const-string v2, "strokeLineCap"

    invoke-static {p1, p2, v2, v0, v1}, La/g/a/a/i;->b(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;II)I

    move-result v0

    iget-object v2, p0, La/o/a/a/k$b;->n:Landroid/graphics/Paint$Cap;

    invoke-direct {p0, v0, v2}, La/o/a/a/k$b;->a(ILandroid/graphics/Paint$Cap;)Landroid/graphics/Paint$Cap;

    move-result-object v0

    iput-object v0, p0, La/o/a/a/k$b;->n:Landroid/graphics/Paint$Cap;

    const/16 v0, 0x9

    const-string v2, "strokeLineJoin"

    invoke-static {p1, p2, v2, v0, v1}, La/g/a/a/i;->b(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;II)I

    move-result v0

    iget-object v1, p0, La/o/a/a/k$b;->o:Landroid/graphics/Paint$Join;

    invoke-direct {p0, v0, v1}, La/o/a/a/k$b;->a(ILandroid/graphics/Paint$Join;)Landroid/graphics/Paint$Join;

    move-result-object v0

    iput-object v0, p0, La/o/a/a/k$b;->o:Landroid/graphics/Paint$Join;

    const/16 v0, 0xa

    iget v1, p0, La/o/a/a/k$b;->p:F

    const-string v2, "strokeMiterLimit"

    invoke-static {p1, p2, v2, v0, v1}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result v0

    iput v0, p0, La/o/a/a/k$b;->p:F

    const/4 v5, 0x3

    const-string v4, "strokeColor"

    move-object v1, p1

    move-object v2, p2

    invoke-static/range {v1 .. v6}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Landroid/content/res/Resources$Theme;Ljava/lang/String;II)La/g/a/a/b;

    move-result-object p3

    iput-object p3, p0, La/o/a/a/k$b;->e:La/g/a/a/b;

    const/16 p3, 0xb

    iget v0, p0, La/o/a/a/k$b;->h:F

    const-string v1, "strokeAlpha"

    invoke-static {p1, p2, v1, p3, v0}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result p3

    iput p3, p0, La/o/a/a/k$b;->h:F

    const/4 p3, 0x4

    iget v0, p0, La/o/a/a/k$b;->f:F

    const-string v1, "strokeWidth"

    invoke-static {p1, p2, v1, p3, v0}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result p3

    iput p3, p0, La/o/a/a/k$b;->f:F

    const/4 p3, 0x6

    iget v0, p0, La/o/a/a/k$b;->l:F

    const-string v1, "trimPathEnd"

    invoke-static {p1, p2, v1, p3, v0}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result p3

    iput p3, p0, La/o/a/a/k$b;->l:F

    const/4 p3, 0x7

    iget v0, p0, La/o/a/a/k$b;->m:F

    const-string v1, "trimPathOffset"

    invoke-static {p1, p2, v1, p3, v0}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result p3

    iput p3, p0, La/o/a/a/k$b;->m:F

    const/4 p3, 0x5

    iget v0, p0, La/o/a/a/k$b;->k:F

    const-string v1, "trimPathStart"

    invoke-static {p1, p2, v1, p3, v0}, La/g/a/a/i;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;IF)F

    move-result p3

    iput p3, p0, La/o/a/a/k$b;->k:F

    const/16 p3, 0xd

    iget v0, p0, La/o/a/a/k$b;->i:I

    const-string v1, "fillType"

    invoke-static {p1, p2, v1, p3, v0}, La/g/a/a/i;->b(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Ljava/lang/String;II)I

    move-result p1

    iput p1, p0, La/o/a/a/k$b;->i:I

    return-void
.end method


# virtual methods
.method public a(Landroid/content/res/Resources;Landroid/util/AttributeSet;Landroid/content/res/Resources$Theme;Lorg/xmlpull/v1/XmlPullParser;)V
    .locals 1

    sget-object v0, La/o/a/a/a;->c:[I

    invoke-static {p1, p3, p2, v0}, La/g/a/a/i;->a(Landroid/content/res/Resources;Landroid/content/res/Resources$Theme;Landroid/util/AttributeSet;[I)Landroid/content/res/TypedArray;

    move-result-object p1

    invoke-direct {p0, p1, p4, p3}, La/o/a/a/k$b;->a(Landroid/content/res/TypedArray;Lorg/xmlpull/v1/XmlPullParser;Landroid/content/res/Resources$Theme;)V

    invoke-virtual {p1}, Landroid/content/res/TypedArray;->recycle()V

    return-void
.end method

.method public a()Z
    .locals 1

    iget-object v0, p0, La/o/a/a/k$b;->g:La/g/a/a/b;

    invoke-virtual {v0}, La/g/a/a/b;->d()Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, La/o/a/a/k$b;->e:La/g/a/a/b;

    invoke-virtual {v0}, La/g/a/a/b;->d()Z

    move-result v0

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 v0, 0x1

    :goto_1
    return v0
.end method

.method public a([I)Z
    .locals 2

    iget-object v0, p0, La/o/a/a/k$b;->g:La/g/a/a/b;

    invoke-virtual {v0, p1}, La/g/a/a/b;->a([I)Z

    move-result v0

    iget-object v1, p0, La/o/a/a/k$b;->e:La/g/a/a/b;

    invoke-virtual {v1, p1}, La/g/a/a/b;->a([I)Z

    move-result p1

    or-int/2addr p1, v0

    return p1
.end method

.method getFillAlpha()F
    .locals 1

    iget v0, p0, La/o/a/a/k$b;->j:F

    return v0
.end method

.method getFillColor()I
    .locals 1

    iget-object v0, p0, La/o/a/a/k$b;->g:La/g/a/a/b;

    invoke-virtual {v0}, La/g/a/a/b;->a()I

    move-result v0

    return v0
.end method

.method getStrokeAlpha()F
    .locals 1

    iget v0, p0, La/o/a/a/k$b;->h:F

    return v0
.end method

.method getStrokeColor()I
    .locals 1

    iget-object v0, p0, La/o/a/a/k$b;->e:La/g/a/a/b;

    invoke-virtual {v0}, La/g/a/a/b;->a()I

    move-result v0

    return v0
.end method

.method getStrokeWidth()F
    .locals 1

    iget v0, p0, La/o/a/a/k$b;->f:F

    return v0
.end method

.method getTrimPathEnd()F
    .locals 1

    iget v0, p0, La/o/a/a/k$b;->l:F

    return v0
.end method

.method getTrimPathOffset()F
    .locals 1

    iget v0, p0, La/o/a/a/k$b;->m:F

    return v0
.end method

.method getTrimPathStart()F
    .locals 1

    iget v0, p0, La/o/a/a/k$b;->k:F

    return v0
.end method

.method setFillAlpha(F)V
    .locals 0

    iput p1, p0, La/o/a/a/k$b;->j:F

    return-void
.end method

.method setFillColor(I)V
    .locals 1

    iget-object v0, p0, La/o/a/a/k$b;->g:La/g/a/a/b;

    invoke-virtual {v0, p1}, La/g/a/a/b;->b(I)V

    return-void
.end method

.method setStrokeAlpha(F)V
    .locals 0

    iput p1, p0, La/o/a/a/k$b;->h:F

    return-void
.end method

.method setStrokeColor(I)V
    .locals 1

    iget-object v0, p0, La/o/a/a/k$b;->e:La/g/a/a/b;

    invoke-virtual {v0, p1}, La/g/a/a/b;->b(I)V

    return-void
.end method

.method setStrokeWidth(F)V
    .locals 0

    iput p1, p0, La/o/a/a/k$b;->f:F

    return-void
.end method

.method setTrimPathEnd(F)V
    .locals 0

    iput p1, p0, La/o/a/a/k$b;->l:F

    return-void
.end method

.method setTrimPathOffset(F)V
    .locals 0

    iput p1, p0, La/o/a/a/k$b;->m:F

    return-void
.end method

.method setTrimPathStart(F)V
    .locals 0

    iput p1, p0, La/o/a/a/k$b;->k:F

    return-void
.end method
