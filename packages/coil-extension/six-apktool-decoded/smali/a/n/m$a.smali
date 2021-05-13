.class La/n/m$a;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/n/m;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "a"
.end annotation


# instance fields
.field private a:I

.field private b:I

.field private c:I

.field private d:I

.field private e:Landroid/view/View;

.field private f:I

.field private g:I


# direct methods
.method constructor <init>(Landroid/view/View;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, La/n/m$a;->e:Landroid/view/View;

    return-void
.end method

.method private a()V
    .locals 5

    iget-object v0, p0, La/n/m$a;->e:Landroid/view/View;

    iget v1, p0, La/n/m$a;->a:I

    iget v2, p0, La/n/m$a;->b:I

    iget v3, p0, La/n/m$a;->c:I

    iget v4, p0, La/n/m$a;->d:I

    invoke-static {v0, v1, v2, v3, v4}, La/n/ba;->a(Landroid/view/View;IIII)V

    const/4 v0, 0x0

    iput v0, p0, La/n/m$a;->f:I

    iput v0, p0, La/n/m$a;->g:I

    return-void
.end method


# virtual methods
.method a(Landroid/graphics/PointF;)V
    .locals 1

    iget v0, p1, Landroid/graphics/PointF;->x:F

    invoke-static {v0}, Ljava/lang/Math;->round(F)I

    move-result v0

    iput v0, p0, La/n/m$a;->c:I

    iget p1, p1, Landroid/graphics/PointF;->y:F

    invoke-static {p1}, Ljava/lang/Math;->round(F)I

    move-result p1

    iput p1, p0, La/n/m$a;->d:I

    iget p1, p0, La/n/m$a;->g:I

    add-int/lit8 p1, p1, 0x1

    iput p1, p0, La/n/m$a;->g:I

    iget p1, p0, La/n/m$a;->f:I

    iget v0, p0, La/n/m$a;->g:I

    if-ne p1, v0, :cond_0

    invoke-direct {p0}, La/n/m$a;->a()V

    :cond_0
    return-void
.end method

.method b(Landroid/graphics/PointF;)V
    .locals 1

    iget v0, p1, Landroid/graphics/PointF;->x:F

    invoke-static {v0}, Ljava/lang/Math;->round(F)I

    move-result v0

    iput v0, p0, La/n/m$a;->a:I

    iget p1, p1, Landroid/graphics/PointF;->y:F

    invoke-static {p1}, Ljava/lang/Math;->round(F)I

    move-result p1

    iput p1, p0, La/n/m$a;->b:I

    iget p1, p0, La/n/m$a;->f:I

    add-int/lit8 p1, p1, 0x1

    iput p1, p0, La/n/m$a;->f:I

    iget p1, p0, La/n/m$a;->f:I

    iget v0, p0, La/n/m$a;->g:I

    if-ne p1, v0, :cond_0

    invoke-direct {p0}, La/n/m$a;->a()V

    :cond_0
    return-void
.end method
