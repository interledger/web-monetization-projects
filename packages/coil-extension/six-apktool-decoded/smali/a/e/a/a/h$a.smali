.class public final enum La/e/a/a/h$a;
.super Ljava/lang/Enum;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/e/a/a/h;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x4019
    name = "a"
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Enum<",
        "La/e/a/a/h$a;",
        ">;"
    }
.end annotation


# static fields
.field public static final enum a:La/e/a/a/h$a;

.field public static final enum b:La/e/a/a/h$a;

.field public static final enum c:La/e/a/a/h$a;

.field public static final enum d:La/e/a/a/h$a;

.field private static final synthetic e:[La/e/a/a/h$a;


# direct methods
.method static constructor <clinit>()V
    .locals 6

    new-instance v0, La/e/a/a/h$a;

    const/4 v1, 0x0

    const-string v2, "FIXED"

    invoke-direct {v0, v2, v1}, La/e/a/a/h$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    new-instance v0, La/e/a/a/h$a;

    const/4 v2, 0x1

    const-string v3, "WRAP_CONTENT"

    invoke-direct {v0, v3, v2}, La/e/a/a/h$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    new-instance v0, La/e/a/a/h$a;

    const/4 v3, 0x2

    const-string v4, "MATCH_CONSTRAINT"

    invoke-direct {v0, v4, v3}, La/e/a/a/h$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    new-instance v0, La/e/a/a/h$a;

    const/4 v4, 0x3

    const-string v5, "MATCH_PARENT"

    invoke-direct {v0, v5, v4}, La/e/a/a/h$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, La/e/a/a/h$a;->d:La/e/a/a/h$a;

    const/4 v0, 0x4

    new-array v0, v0, [La/e/a/a/h$a;

    sget-object v5, La/e/a/a/h$a;->a:La/e/a/a/h$a;

    aput-object v5, v0, v1

    sget-object v1, La/e/a/a/h$a;->b:La/e/a/a/h$a;

    aput-object v1, v0, v2

    sget-object v1, La/e/a/a/h$a;->c:La/e/a/a/h$a;

    aput-object v1, v0, v3

    sget-object v1, La/e/a/a/h$a;->d:La/e/a/a/h$a;

    aput-object v1, v0, v4

    sput-object v0, La/e/a/a/h$a;->e:[La/e/a/a/h$a;

    return-void
.end method

.method private constructor <init>(Ljava/lang/String;I)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    invoke-direct {p0, p1, p2}, Ljava/lang/Enum;-><init>(Ljava/lang/String;I)V

    return-void
.end method

.method public static valueOf(Ljava/lang/String;)La/e/a/a/h$a;
    .locals 1

    const-class v0, La/e/a/a/h$a;

    invoke-static {v0, p0}, Ljava/lang/Enum;->valueOf(Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;

    move-result-object p0

    check-cast p0, La/e/a/a/h$a;

    return-object p0
.end method

.method public static values()[La/e/a/a/h$a;
    .locals 1

    sget-object v0, La/e/a/a/h$a;->e:[La/e/a/a/h$a;

    invoke-virtual {v0}, [La/e/a/a/h$a;->clone()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, [La/e/a/a/h$a;

    return-object v0
.end method
