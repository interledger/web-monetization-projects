.class Lcom/google/android/material/floatingactionbutton/e;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcom/google/android/material/floatingactionbutton/e$a;,
        Lcom/google/android/material/floatingactionbutton/e$c;,
        Lcom/google/android/material/floatingactionbutton/e$b;,
        Lcom/google/android/material/floatingactionbutton/e$e;,
        Lcom/google/android/material/floatingactionbutton/e$f;,
        Lcom/google/android/material/floatingactionbutton/e$d;
    }
.end annotation


# static fields
.field static final a:Landroid/animation/TimeInterpolator;

.field static final b:[I

.field static final c:[I

.field static final d:[I

.field static final e:[I

.field static final f:[I

.field static final g:[I


# instance fields
.field private A:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroid/animation/Animator$AnimatorListener;",
            ">;"
        }
    .end annotation
.end field

.field final B:Lcom/google/android/material/internal/j;

.field final C:Lb/a/a/a/h/b;

.field private final D:Landroid/graphics/Rect;

.field private final E:Landroid/graphics/RectF;

.field private final F:Landroid/graphics/RectF;

.field private final G:Landroid/graphics/Matrix;

.field private H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

.field h:I

.field i:Landroid/animation/Animator;

.field j:Lb/a/a/a/a/h;

.field k:Lb/a/a/a/a/h;

.field private l:Lb/a/a/a/a/h;

.field private m:Lb/a/a/a/a/h;

.field private final n:Lcom/google/android/material/internal/g;

.field o:Lb/a/a/a/h/a;

.field private p:F

.field q:Landroid/graphics/drawable/Drawable;

.field r:Landroid/graphics/drawable/Drawable;

.field s:Lcom/google/android/material/internal/b;

.field t:Landroid/graphics/drawable/Drawable;

.field u:F

.field v:F

.field w:F

.field x:I

.field y:F

.field private z:Ljava/util/ArrayList;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/ArrayList<",
            "Landroid/animation/Animator$AnimatorListener;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method static constructor <clinit>()V
    .locals 3

    sget-object v0, Lb/a/a/a/a/a;->c:Landroid/animation/TimeInterpolator;

    sput-object v0, Lcom/google/android/material/floatingactionbutton/e;->a:Landroid/animation/TimeInterpolator;

    const/4 v0, 0x2

    new-array v1, v0, [I

    fill-array-data v1, :array_0

    sput-object v1, Lcom/google/android/material/floatingactionbutton/e;->b:[I

    const/4 v1, 0x3

    new-array v1, v1, [I

    fill-array-data v1, :array_1

    sput-object v1, Lcom/google/android/material/floatingactionbutton/e;->c:[I

    new-array v1, v0, [I

    fill-array-data v1, :array_2

    sput-object v1, Lcom/google/android/material/floatingactionbutton/e;->d:[I

    new-array v0, v0, [I

    fill-array-data v0, :array_3

    sput-object v0, Lcom/google/android/material/floatingactionbutton/e;->e:[I

    const/4 v0, 0x1

    new-array v0, v0, [I

    const/4 v1, 0x0

    const v2, 0x101009e

    aput v2, v0, v1

    sput-object v0, Lcom/google/android/material/floatingactionbutton/e;->f:[I

    new-array v0, v1, [I

    sput-object v0, Lcom/google/android/material/floatingactionbutton/e;->g:[I

    return-void

    :array_0
    .array-data 4
        0x10100a7
        0x101009e
    .end array-data

    :array_1
    .array-data 4
        0x1010367
        0x101009c
        0x101009e
    .end array-data

    :array_2
    .array-data 4
        0x101009c
        0x101009e
    .end array-data

    :array_3
    .array-data 4
        0x1010367
        0x101009e
    .end array-data
.end method

.method constructor <init>(Lcom/google/android/material/internal/j;Lb/a/a/a/h/b;)V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, Lcom/google/android/material/floatingactionbutton/e;->h:I

    const/high16 v0, 0x3f800000    # 1.0f

    iput v0, p0, Lcom/google/android/material/floatingactionbutton/e;->y:F

    new-instance v0, Landroid/graphics/Rect;

    invoke-direct {v0}, Landroid/graphics/Rect;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->D:Landroid/graphics/Rect;

    new-instance v0, Landroid/graphics/RectF;

    invoke-direct {v0}, Landroid/graphics/RectF;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->E:Landroid/graphics/RectF;

    new-instance v0, Landroid/graphics/RectF;

    invoke-direct {v0}, Landroid/graphics/RectF;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->F:Landroid/graphics/RectF;

    new-instance v0, Landroid/graphics/Matrix;

    invoke-direct {v0}, Landroid/graphics/Matrix;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->G:Landroid/graphics/Matrix;

    iput-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    iput-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->C:Lb/a/a/a/h/b;

    new-instance p1, Lcom/google/android/material/internal/g;

    invoke-direct {p1}, Lcom/google/android/material/internal/g;-><init>()V

    iput-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    sget-object p2, Lcom/google/android/material/floatingactionbutton/e;->b:[I

    new-instance v0, Lcom/google/android/material/floatingactionbutton/e$c;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/e$c;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    invoke-direct {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;

    move-result-object v0

    invoke-virtual {p1, p2, v0}, Lcom/google/android/material/internal/g;->a([ILandroid/animation/ValueAnimator;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    sget-object p2, Lcom/google/android/material/floatingactionbutton/e;->c:[I

    new-instance v0, Lcom/google/android/material/floatingactionbutton/e$b;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/e$b;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    invoke-direct {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;

    move-result-object v0

    invoke-virtual {p1, p2, v0}, Lcom/google/android/material/internal/g;->a([ILandroid/animation/ValueAnimator;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    sget-object p2, Lcom/google/android/material/floatingactionbutton/e;->d:[I

    new-instance v0, Lcom/google/android/material/floatingactionbutton/e$b;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/e$b;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    invoke-direct {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;

    move-result-object v0

    invoke-virtual {p1, p2, v0}, Lcom/google/android/material/internal/g;->a([ILandroid/animation/ValueAnimator;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    sget-object p2, Lcom/google/android/material/floatingactionbutton/e;->e:[I

    new-instance v0, Lcom/google/android/material/floatingactionbutton/e$b;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/e$b;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    invoke-direct {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;

    move-result-object v0

    invoke-virtual {p1, p2, v0}, Lcom/google/android/material/internal/g;->a([ILandroid/animation/ValueAnimator;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    sget-object p2, Lcom/google/android/material/floatingactionbutton/e;->f:[I

    new-instance v0, Lcom/google/android/material/floatingactionbutton/e$e;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/e$e;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    invoke-direct {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;

    move-result-object v0

    invoke-virtual {p1, p2, v0}, Lcom/google/android/material/internal/g;->a([ILandroid/animation/ValueAnimator;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    sget-object p2, Lcom/google/android/material/floatingactionbutton/e;->g:[I

    new-instance v0, Lcom/google/android/material/floatingactionbutton/e$a;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/e$a;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    invoke-direct {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;

    move-result-object v0

    invoke-virtual {p1, p2, v0}, Lcom/google/android/material/internal/g;->a([ILandroid/animation/ValueAnimator;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {p1}, Landroid/widget/ImageButton;->getRotation()F

    move-result p1

    iput p1, p0, Lcom/google/android/material/floatingactionbutton/e;->p:F

    return-void
.end method

.method private a(Lb/a/a/a/a/h;FFF)Landroid/animation/AnimatorSet;
    .locals 6

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iget-object v1, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    sget-object v2, Landroid/view/View;->ALPHA:Landroid/util/Property;

    const/4 v3, 0x1

    new-array v4, v3, [F

    const/4 v5, 0x0

    aput p2, v4, v5

    invoke-static {v1, v2, v4}, Landroid/animation/ObjectAnimator;->ofFloat(Ljava/lang/Object;Landroid/util/Property;[F)Landroid/animation/ObjectAnimator;

    move-result-object p2

    const-string v1, "opacity"

    invoke-virtual {p1, v1}, Lb/a/a/a/a/h;->a(Ljava/lang/String;)Lb/a/a/a/a/i;

    move-result-object v1

    invoke-virtual {v1, p2}, Lb/a/a/a/a/i;->a(Landroid/animation/Animator;)V

    invoke-interface {v0, p2}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    sget-object v1, Landroid/view/View;->SCALE_X:Landroid/util/Property;

    new-array v2, v3, [F

    aput p3, v2, v5

    invoke-static {p2, v1, v2}, Landroid/animation/ObjectAnimator;->ofFloat(Ljava/lang/Object;Landroid/util/Property;[F)Landroid/animation/ObjectAnimator;

    move-result-object p2

    const-string v1, "scale"

    invoke-virtual {p1, v1}, Lb/a/a/a/a/h;->a(Ljava/lang/String;)Lb/a/a/a/a/i;

    move-result-object v2

    invoke-virtual {v2, p2}, Lb/a/a/a/a/i;->a(Landroid/animation/Animator;)V

    invoke-interface {v0, p2}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    sget-object v2, Landroid/view/View;->SCALE_Y:Landroid/util/Property;

    new-array v4, v3, [F

    aput p3, v4, v5

    invoke-static {p2, v2, v4}, Landroid/animation/ObjectAnimator;->ofFloat(Ljava/lang/Object;Landroid/util/Property;[F)Landroid/animation/ObjectAnimator;

    move-result-object p2

    invoke-virtual {p1, v1}, Lb/a/a/a/a/h;->a(Ljava/lang/String;)Lb/a/a/a/a/i;

    move-result-object p3

    invoke-virtual {p3, p2}, Lb/a/a/a/a/i;->a(Landroid/animation/Animator;)V

    invoke-interface {v0, p2}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->G:Landroid/graphics/Matrix;

    invoke-direct {p0, p4, p2}, Lcom/google/android/material/floatingactionbutton/e;->a(FLandroid/graphics/Matrix;)V

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    new-instance p3, Lb/a/a/a/a/f;

    invoke-direct {p3}, Lb/a/a/a/a/f;-><init>()V

    new-instance p4, Lb/a/a/a/a/g;

    invoke-direct {p4}, Lb/a/a/a/a/g;-><init>()V

    new-array v1, v3, [Landroid/graphics/Matrix;

    new-instance v2, Landroid/graphics/Matrix;

    iget-object v3, p0, Lcom/google/android/material/floatingactionbutton/e;->G:Landroid/graphics/Matrix;

    invoke-direct {v2, v3}, Landroid/graphics/Matrix;-><init>(Landroid/graphics/Matrix;)V

    aput-object v2, v1, v5

    invoke-static {p2, p3, p4, v1}, Landroid/animation/ObjectAnimator;->ofObject(Ljava/lang/Object;Landroid/util/Property;Landroid/animation/TypeEvaluator;[Ljava/lang/Object;)Landroid/animation/ObjectAnimator;

    move-result-object p2

    const-string p3, "iconScale"

    invoke-virtual {p1, p3}, Lb/a/a/a/a/h;->a(Ljava/lang/String;)Lb/a/a/a/a/i;

    move-result-object p1

    invoke-virtual {p1, p2}, Lb/a/a/a/a/i;->a(Landroid/animation/Animator;)V

    invoke-interface {v0, p2}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    new-instance p1, Landroid/animation/AnimatorSet;

    invoke-direct {p1}, Landroid/animation/AnimatorSet;-><init>()V

    invoke-static {p1, v0}, Lb/a/a/a/a/b;->a(Landroid/animation/AnimatorSet;Ljava/util/List;)V

    return-object p1
.end method

.method private a(Lcom/google/android/material/floatingactionbutton/e$f;)Landroid/animation/ValueAnimator;
    .locals 3

    new-instance v0, Landroid/animation/ValueAnimator;

    invoke-direct {v0}, Landroid/animation/ValueAnimator;-><init>()V

    sget-object v1, Lcom/google/android/material/floatingactionbutton/e;->a:Landroid/animation/TimeInterpolator;

    invoke-virtual {v0, v1}, Landroid/animation/ValueAnimator;->setInterpolator(Landroid/animation/TimeInterpolator;)V

    const-wide/16 v1, 0x64

    invoke-virtual {v0, v1, v2}, Landroid/animation/ValueAnimator;->setDuration(J)Landroid/animation/ValueAnimator;

    invoke-virtual {v0, p1}, Landroid/animation/ValueAnimator;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    invoke-virtual {v0, p1}, Landroid/animation/ValueAnimator;->addUpdateListener(Landroid/animation/ValueAnimator$AnimatorUpdateListener;)V

    const/4 p1, 0x2

    new-array p1, p1, [F

    fill-array-data p1, :array_0

    invoke-virtual {v0, p1}, Landroid/animation/ValueAnimator;->setFloatValues([F)V

    return-object v0

    nop

    :array_0
    .array-data 4
        0x0
        0x3f800000    # 1.0f
    .end array-data
.end method

.method private a(FLandroid/graphics/Matrix;)V
    .locals 5

    invoke-virtual {p2}, Landroid/graphics/Matrix;->reset()V

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getDrawable()Landroid/graphics/drawable/Drawable;

    move-result-object v0

    if-eqz v0, :cond_0

    iget v1, p0, Lcom/google/android/material/floatingactionbutton/e;->x:I

    if-eqz v1, :cond_0

    iget-object v1, p0, Lcom/google/android/material/floatingactionbutton/e;->E:Landroid/graphics/RectF;

    iget-object v2, p0, Lcom/google/android/material/floatingactionbutton/e;->F:Landroid/graphics/RectF;

    invoke-virtual {v0}, Landroid/graphics/drawable/Drawable;->getIntrinsicWidth()I

    move-result v3

    int-to-float v3, v3

    invoke-virtual {v0}, Landroid/graphics/drawable/Drawable;->getIntrinsicHeight()I

    move-result v0

    int-to-float v0, v0

    const/4 v4, 0x0

    invoke-virtual {v1, v4, v4, v3, v0}, Landroid/graphics/RectF;->set(FFFF)V

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->x:I

    int-to-float v3, v0

    int-to-float v0, v0

    invoke-virtual {v2, v4, v4, v3, v0}, Landroid/graphics/RectF;->set(FFFF)V

    sget-object v0, Landroid/graphics/Matrix$ScaleToFit;->CENTER:Landroid/graphics/Matrix$ScaleToFit;

    invoke-virtual {p2, v1, v2, v0}, Landroid/graphics/Matrix;->setRectToRect(Landroid/graphics/RectF;Landroid/graphics/RectF;Landroid/graphics/Matrix$ScaleToFit;)Z

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->x:I

    int-to-float v1, v0

    const/high16 v2, 0x40000000    # 2.0f

    div-float/2addr v1, v2

    int-to-float v0, v0

    div-float/2addr v0, v2

    invoke-virtual {p2, p1, p1, v1, v0}, Landroid/graphics/Matrix;->postScale(FFFF)Z

    :cond_0
    return-void
.end method

.method private q()V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

    if-nez v0, :cond_0

    new-instance v0, Lcom/google/android/material/floatingactionbutton/d;

    invoke-direct {v0, p0}, Lcom/google/android/material/floatingactionbutton/d;-><init>(Lcom/google/android/material/floatingactionbutton/e;)V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

    :cond_0
    return-void
.end method

.method private r()Lb/a/a/a/a/h;
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->m:Lb/a/a/a/a/h;

    if-nez v0, :cond_0

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getContext()Landroid/content/Context;

    move-result-object v0

    sget v1, Lb/a/a/a/a;->design_fab_hide_motion_spec:I

    invoke-static {v0, v1}, Lb/a/a/a/a/h;->a(Landroid/content/Context;I)Lb/a/a/a/a/h;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->m:Lb/a/a/a/a/h;

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->m:Lb/a/a/a/a/h;

    return-object v0
.end method

.method private s()Lb/a/a/a/a/h;
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->l:Lb/a/a/a/a/h;

    if-nez v0, :cond_0

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getContext()Landroid/content/Context;

    move-result-object v0

    sget v1, Lb/a/a/a/a;->design_fab_show_motion_spec:I

    invoke-static {v0, v1}, Lb/a/a/a/a/h;->a(Landroid/content/Context;I)Lb/a/a/a/a/h;

    move-result-object v0

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->l:Lb/a/a/a/a/h;

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->l:Lb/a/a/a/a/h;

    return-object v0
.end method

.method private t()Z
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-static {v0}, La/g/i/s;->w(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->isInEditMode()Z

    move-result v0

    if-nez v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method private u()V
    .locals 3

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v1, 0x0

    const/16 v2, 0x13

    if-ne v0, v2, :cond_1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->p:F

    const/high16 v2, 0x42b40000    # 90.0f

    rem-float/2addr v0, v2

    const/4 v2, 0x0

    cmpl-float v0, v0, v2

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getLayerType()I

    move-result v0

    const/4 v2, 0x1

    if-eq v0, v2, :cond_1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    goto :goto_0

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getLayerType()I

    move-result v0

    if-eqz v0, :cond_1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    const/4 v2, 0x0

    :goto_0
    invoke-virtual {v0, v2, v1}, Landroid/widget/ImageButton;->setLayerType(ILandroid/graphics/Paint;)V

    :cond_1
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->o:Lb/a/a/a/h/a;

    if-nez v0, :cond_3

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->s:Lcom/google/android/material/internal/b;

    if-nez v0, :cond_2

    return-void

    :cond_2
    iget v2, p0, Lcom/google/android/material/floatingactionbutton/e;->p:F

    neg-float v2, v2

    invoke-virtual {v0, v2}, Lcom/google/android/material/internal/b;->a(F)V

    throw v1

    :cond_3
    iget v2, p0, Lcom/google/android/material/floatingactionbutton/e;->p:F

    neg-float v2, v2

    invoke-virtual {v0, v2}, Lb/a/a/a/h/a;->a(F)V

    throw v1
.end method


# virtual methods
.method final a()Landroid/graphics/drawable/Drawable;
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->t:Landroid/graphics/drawable/Drawable;

    return-object v0
.end method

.method final a(F)V
    .locals 2

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->u:F

    cmpl-float v0, v0, p1

    if-eqz v0, :cond_0

    iput p1, p0, Lcom/google/android/material/floatingactionbutton/e;->u:F

    iget p1, p0, Lcom/google/android/material/floatingactionbutton/e;->u:F

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->v:F

    iget v1, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    invoke-virtual {p0, p1, v0, v1}, Lcom/google/android/material/floatingactionbutton/e;->a(FFF)V

    :cond_0
    return-void
.end method

.method a(FFF)V
    .locals 0

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->o:Lb/a/a/a/h/a;

    if-nez p2, :cond_0

    return-void

    :cond_0
    iget p3, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    add-float/2addr p3, p1

    invoke-virtual {p2, p1, p3}, Lb/a/a/a/h/a;->a(FF)V

    const/4 p1, 0x0

    throw p1
.end method

.method public a(Landroid/animation/Animator$AnimatorListener;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->A:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->A:Ljava/util/ArrayList;

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->A:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method a(Landroid/content/res/ColorStateList;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->q:Landroid/graphics/drawable/Drawable;

    if-eqz v0, :cond_0

    invoke-static {v0, p1}, Landroidx/core/graphics/drawable/a;->a(Landroid/graphics/drawable/Drawable;Landroid/content/res/ColorStateList;)V

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->s:Lcom/google/android/material/internal/b;

    if-nez v0, :cond_1

    return-void

    :cond_1
    invoke-virtual {v0, p1}, Lcom/google/android/material/internal/b;->a(Landroid/content/res/ColorStateList;)V

    const/4 p1, 0x0

    throw p1
.end method

.method a(Landroid/graphics/PorterDuff$Mode;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->q:Landroid/graphics/drawable/Drawable;

    if-eqz v0, :cond_0

    invoke-static {v0, p1}, Landroidx/core/graphics/drawable/a;->a(Landroid/graphics/drawable/Drawable;Landroid/graphics/PorterDuff$Mode;)V

    :cond_0
    return-void
.end method

.method a(Landroid/graphics/Rect;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->o:Lb/a/a/a/h/a;

    invoke-virtual {v0, p1}, Lb/a/a/a/h/a;->getPadding(Landroid/graphics/Rect;)Z

    const/4 p1, 0x0

    throw p1
.end method

.method final a(Lb/a/a/a/a/h;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->k:Lb/a/a/a/a/h;

    return-void
.end method

.method a(Lcom/google/android/material/floatingactionbutton/e$d;Z)V
    .locals 2

    invoke-virtual {p0}, Lcom/google/android/material/floatingactionbutton/e;->g()Z

    move-result v0

    if-eqz v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->i:Landroid/animation/Animator;

    if-eqz v0, :cond_1

    invoke-virtual {v0}, Landroid/animation/Animator;->cancel()V

    :cond_1
    invoke-direct {p0}, Lcom/google/android/material/floatingactionbutton/e;->t()Z

    move-result v0

    if-eqz v0, :cond_4

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->k:Lb/a/a/a/a/h;

    if-eqz v0, :cond_2

    goto :goto_0

    :cond_2
    invoke-direct {p0}, Lcom/google/android/material/floatingactionbutton/e;->r()Lb/a/a/a/a/h;

    move-result-object v0

    :goto_0
    const/4 v1, 0x0

    invoke-direct {p0, v0, v1, v1, v1}, Lcom/google/android/material/floatingactionbutton/e;->a(Lb/a/a/a/a/h;FFF)Landroid/animation/AnimatorSet;

    move-result-object v0

    new-instance v1, Lcom/google/android/material/floatingactionbutton/b;

    invoke-direct {v1, p0, p2, p1}, Lcom/google/android/material/floatingactionbutton/b;-><init>(Lcom/google/android/material/floatingactionbutton/e;ZLcom/google/android/material/floatingactionbutton/e$d;)V

    invoke-virtual {v0, v1}, Landroid/animation/AnimatorSet;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->A:Ljava/util/ArrayList;

    if-eqz p1, :cond_3

    invoke-virtual {p1}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object p1

    :goto_1
    invoke-interface {p1}, Ljava/util/Iterator;->hasNext()Z

    move-result p2

    if-eqz p2, :cond_3

    invoke-interface {p1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object p2

    check-cast p2, Landroid/animation/Animator$AnimatorListener;

    invoke-virtual {v0, p2}, Landroid/animation/AnimatorSet;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    goto :goto_1

    :cond_3
    invoke-virtual {v0}, Landroid/animation/AnimatorSet;->start()V

    goto :goto_3

    :cond_4
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    if-eqz p2, :cond_5

    const/16 v1, 0x8

    goto :goto_2

    :cond_5
    const/4 v1, 0x4

    :goto_2
    invoke-virtual {v0, v1, p2}, Lcom/google/android/material/internal/j;->a(IZ)V

    if-eqz p1, :cond_6

    invoke-interface {p1}, Lcom/google/android/material/floatingactionbutton/e$d;->b()V

    :cond_6
    :goto_3
    return-void
.end method

.method a([I)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    invoke-virtual {v0, p1}, Lcom/google/android/material/internal/g;->a([I)V

    return-void
.end method

.method b()F
    .locals 1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->u:F

    return v0
.end method

.method final b(F)V
    .locals 2

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->v:F

    cmpl-float v0, v0, p1

    if-eqz v0, :cond_0

    iput p1, p0, Lcom/google/android/material/floatingactionbutton/e;->v:F

    iget p1, p0, Lcom/google/android/material/floatingactionbutton/e;->u:F

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->v:F

    iget v1, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    invoke-virtual {p0, p1, v0, v1}, Lcom/google/android/material/floatingactionbutton/e;->a(FFF)V

    :cond_0
    return-void
.end method

.method b(Landroid/animation/Animator$AnimatorListener;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->z:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->z:Ljava/util/ArrayList;

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->z:Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method b(Landroid/content/res/ColorStateList;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->r:Landroid/graphics/drawable/Drawable;

    if-eqz v0, :cond_0

    invoke-static {p1}, Lb/a/a/a/g/a;->a(Landroid/content/res/ColorStateList;)Landroid/content/res/ColorStateList;

    move-result-object p1

    invoke-static {v0, p1}, Landroidx/core/graphics/drawable/a;->a(Landroid/graphics/drawable/Drawable;Landroid/content/res/ColorStateList;)V

    :cond_0
    return-void
.end method

.method b(Landroid/graphics/Rect;)V
    .locals 0

    return-void
.end method

.method final b(Lb/a/a/a/a/h;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->j:Lb/a/a/a/a/h;

    return-void
.end method

.method b(Lcom/google/android/material/floatingactionbutton/e$d;Z)V
    .locals 3

    invoke-virtual {p0}, Lcom/google/android/material/floatingactionbutton/e;->h()Z

    move-result v0

    if-eqz v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->i:Landroid/animation/Animator;

    if-eqz v0, :cond_1

    invoke-virtual {v0}, Landroid/animation/Animator;->cancel()V

    :cond_1
    invoke-direct {p0}, Lcom/google/android/material/floatingactionbutton/e;->t()Z

    move-result v0

    const/high16 v1, 0x3f800000    # 1.0f

    if-eqz v0, :cond_5

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getVisibility()I

    move-result v0

    if-eqz v0, :cond_2

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    const/4 v2, 0x0

    invoke-virtual {v0, v2}, Landroid/widget/ImageButton;->setAlpha(F)V

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0, v2}, Landroid/widget/ImageButton;->setScaleY(F)V

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0, v2}, Landroid/widget/ImageButton;->setScaleX(F)V

    invoke-virtual {p0, v2}, Lcom/google/android/material/floatingactionbutton/e;->c(F)V

    :cond_2
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->j:Lb/a/a/a/a/h;

    if-eqz v0, :cond_3

    goto :goto_0

    :cond_3
    invoke-direct {p0}, Lcom/google/android/material/floatingactionbutton/e;->s()Lb/a/a/a/a/h;

    move-result-object v0

    :goto_0
    invoke-direct {p0, v0, v1, v1, v1}, Lcom/google/android/material/floatingactionbutton/e;->a(Lb/a/a/a/a/h;FFF)Landroid/animation/AnimatorSet;

    move-result-object v0

    new-instance v1, Lcom/google/android/material/floatingactionbutton/c;

    invoke-direct {v1, p0, p2, p1}, Lcom/google/android/material/floatingactionbutton/c;-><init>(Lcom/google/android/material/floatingactionbutton/e;ZLcom/google/android/material/floatingactionbutton/e$d;)V

    invoke-virtual {v0, v1}, Landroid/animation/AnimatorSet;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->z:Ljava/util/ArrayList;

    if-eqz p1, :cond_4

    invoke-virtual {p1}, Ljava/util/ArrayList;->iterator()Ljava/util/Iterator;

    move-result-object p1

    :goto_1
    invoke-interface {p1}, Ljava/util/Iterator;->hasNext()Z

    move-result p2

    if-eqz p2, :cond_4

    invoke-interface {p1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object p2

    check-cast p2, Landroid/animation/Animator$AnimatorListener;

    invoke-virtual {v0, p2}, Landroid/animation/AnimatorSet;->addListener(Landroid/animation/Animator$AnimatorListener;)V

    goto :goto_1

    :cond_4
    invoke-virtual {v0}, Landroid/animation/AnimatorSet;->start()V

    goto :goto_2

    :cond_5
    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    const/4 v2, 0x0

    invoke-virtual {v0, v2, p2}, Lcom/google/android/material/internal/j;->a(IZ)V

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {p2, v1}, Landroid/widget/ImageButton;->setAlpha(F)V

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {p2, v1}, Landroid/widget/ImageButton;->setScaleY(F)V

    iget-object p2, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {p2, v1}, Landroid/widget/ImageButton;->setScaleX(F)V

    invoke-virtual {p0, v1}, Lcom/google/android/material/floatingactionbutton/e;->c(F)V

    if-eqz p1, :cond_6

    invoke-interface {p1}, Lcom/google/android/material/floatingactionbutton/e$d;->a()V

    :cond_6
    :goto_2
    return-void
.end method

.method final c()Lb/a/a/a/a/h;
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->k:Lb/a/a/a/a/h;

    return-object v0
.end method

.method final c(F)V
    .locals 1

    iput p1, p0, Lcom/google/android/material/floatingactionbutton/e;->y:F

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->G:Landroid/graphics/Matrix;

    invoke-direct {p0, p1, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(FLandroid/graphics/Matrix;)V

    iget-object p1, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {p1, v0}, Landroid/widget/ImageButton;->setImageMatrix(Landroid/graphics/Matrix;)V

    return-void
.end method

.method public c(Landroid/animation/Animator$AnimatorListener;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->A:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    return-void

    :cond_0
    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    return-void
.end method

.method d()F
    .locals 1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->v:F

    return v0
.end method

.method final d(F)V
    .locals 2

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    cmpl-float v0, v0, p1

    if-eqz v0, :cond_0

    iput p1, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    iget p1, p0, Lcom/google/android/material/floatingactionbutton/e;->u:F

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->v:F

    iget v1, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    invoke-virtual {p0, p1, v0, v1}, Lcom/google/android/material/floatingactionbutton/e;->a(FFF)V

    :cond_0
    return-void
.end method

.method d(Landroid/animation/Animator$AnimatorListener;)V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->z:Ljava/util/ArrayList;

    if-nez v0, :cond_0

    return-void

    :cond_0
    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    return-void
.end method

.method e()F
    .locals 1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->w:F

    return v0
.end method

.method final f()Lb/a/a/a/a/h;
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->j:Lb/a/a/a/a/h;

    return-object v0
.end method

.method g()Z
    .locals 4

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getVisibility()I

    move-result v0

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-nez v0, :cond_1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->h:I

    if-ne v0, v2, :cond_0

    move v1, v2

    :cond_0
    return v1

    :cond_1
    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->h:I

    const/4 v3, 0x2

    if-eq v0, v3, :cond_2

    move v1, v2

    :cond_2
    return v1
.end method

.method h()Z
    .locals 4

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getVisibility()I

    move-result v0

    const/4 v1, 0x0

    const/4 v2, 0x1

    if-eqz v0, :cond_1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->h:I

    const/4 v3, 0x2

    if-ne v0, v3, :cond_0

    move v1, v2

    :cond_0
    return v1

    :cond_1
    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->h:I

    if-eq v0, v2, :cond_2

    move v1, v2

    :cond_2
    return v1
.end method

.method i()V
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->n:Lcom/google/android/material/internal/g;

    invoke-virtual {v0}, Lcom/google/android/material/internal/g;->a()V

    return-void
.end method

.method j()V
    .locals 2

    invoke-virtual {p0}, Lcom/google/android/material/floatingactionbutton/e;->n()Z

    move-result v0

    if-eqz v0, :cond_0

    invoke-direct {p0}, Lcom/google/android/material/floatingactionbutton/e;->q()V

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getViewTreeObserver()Landroid/view/ViewTreeObserver;

    move-result-object v0

    iget-object v1, p0, Lcom/google/android/material/floatingactionbutton/e;->H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

    invoke-virtual {v0, v1}, Landroid/view/ViewTreeObserver;->addOnPreDrawListener(Landroid/view/ViewTreeObserver$OnPreDrawListener;)V

    :cond_0
    return-void
.end method

.method k()V
    .locals 0

    return-void
.end method

.method l()V
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getViewTreeObserver()Landroid/view/ViewTreeObserver;

    move-result-object v0

    iget-object v1, p0, Lcom/google/android/material/floatingactionbutton/e;->H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

    invoke-virtual {v0, v1}, Landroid/view/ViewTreeObserver;->removeOnPreDrawListener(Landroid/view/ViewTreeObserver$OnPreDrawListener;)V

    const/4 v0, 0x0

    iput-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->H:Landroid/view/ViewTreeObserver$OnPreDrawListener;

    :cond_0
    return-void
.end method

.method m()V
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->B:Lcom/google/android/material/internal/j;

    invoke-virtual {v0}, Landroid/widget/ImageButton;->getRotation()F

    move-result v0

    iget v1, p0, Lcom/google/android/material/floatingactionbutton/e;->p:F

    cmpl-float v1, v1, v0

    if-eqz v1, :cond_0

    iput v0, p0, Lcom/google/android/material/floatingactionbutton/e;->p:F

    invoke-direct {p0}, Lcom/google/android/material/floatingactionbutton/e;->u()V

    :cond_0
    return-void
.end method

.method n()Z
    .locals 1

    const/4 v0, 0x1

    return v0
.end method

.method final o()V
    .locals 1

    iget v0, p0, Lcom/google/android/material/floatingactionbutton/e;->y:F

    invoke-virtual {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->c(F)V

    return-void
.end method

.method final p()V
    .locals 5

    iget-object v0, p0, Lcom/google/android/material/floatingactionbutton/e;->D:Landroid/graphics/Rect;

    invoke-virtual {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->a(Landroid/graphics/Rect;)V

    invoke-virtual {p0, v0}, Lcom/google/android/material/floatingactionbutton/e;->b(Landroid/graphics/Rect;)V

    iget-object v1, p0, Lcom/google/android/material/floatingactionbutton/e;->C:Lb/a/a/a/h/b;

    iget v2, v0, Landroid/graphics/Rect;->left:I

    iget v3, v0, Landroid/graphics/Rect;->top:I

    iget v4, v0, Landroid/graphics/Rect;->right:I

    iget v0, v0, Landroid/graphics/Rect;->bottom:I

    invoke-interface {v1, v2, v3, v4, v0}, Lb/a/a/a/h/b;->a(IIII)V

    return-void
.end method
